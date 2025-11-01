import { AgentToolInterface } from '@gitroom/nestjs-libraries/chat/agent.tool.interface';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { Injectable } from '@nestjs/common';
import { IntegrationSchedulePostTool } from './integration.schedule.post';
import { IntegrationService } from '@gitroom/nestjs-libraries/database/prisma/integrations/integration.service';
import { OpenaiService } from '@gitroom/nestjs-libraries/openai/openai.service';
import { checkAuth } from '@gitroom/nestjs-libraries/chat/auth.context';

@Injectable()
export class McpSchedulePostWrapper implements AgentToolInterface {
  constructor(
    private _schedulePostTool: IntegrationSchedulePostTool,
    private _integrationService: IntegrationService,
    private _openAiService: OpenaiService
  ) {}

  name = 'mcpSchedulePostWrapper';

  run() {
    return createTool({
      id: 'POSTIZ_SCHEDULE_POST',
      description: 'Schedule social media posts with text and images. Images must be publicly accessible URLs (HTTP/HTTPS). Supports AI image generation when generatePictures is true.',

      inputSchema: z.object({
        type: z.enum(['draft', 'schedule', 'now']),
        configId: z.string(),
        generatePictures: z.boolean(),
        date: z.string().describe('UTC TIME in ISO 8601 format'),
        providerId: z.string().describe('Integration ID from POSTIZ_PROVIDERS_LIST'),
        posts: z.array(
          z.object({
            text: z.string(),
            images: z.array(z.string()).default([]),
          })
        ),
      }),

      outputSchema: z.object({
        result: z.string(),
        postId: z.string().optional(),
      }),

      execute: async (args, options) => {
        const { context, runtimeContext } = args;

        checkAuth(args, options);
        const organizationId = JSON.parse(
          // @ts-ignore
          runtimeContext.get('organization') as string
        ).id;

        const integration = await this._integrationService.getIntegrationById(
          organizationId,
          context.providerId
        );

        if (!integration) {
          throw new Error(`Integration ${context.providerId} not found`);
        }

        const transformedPostsAndComments = await Promise.all(
          context.posts.map(async (post) => {
            let attachments: string[] = [];

            if (post.images && post.images.length > 0) {
              attachments = post.images;
            }
            else if (context.generatePictures) {
              const aiImageUrl = await this._openAiService.generateImage(
                post.text,
                true
              );
              attachments = [aiImageUrl];
            }

            return {
              content: post.text,
              attachments,
            };
          })
        );

        // Add platform-specific settings
        const settings = [];
        if (integration.providerIdentifier === 'x') {
          // Twitter requires who_can_reply_post setting
          settings.push({
            key: 'who_can_reply_post',
            value: 'everyone'
          });
        }

        const internalTool = this._schedulePostTool.run();
        const result = await internalTool.execute(
          {
            context: {
              socialPost: [
                {
                  integrationId: context.providerId,
                  isPremium: integration.providerIdentifier === 'x' ? true : false,
                  date: context.date,
                  shortLink: false,
                  type: context.type,
                  postsAndComments: transformedPostsAndComments,
                  settings,
                },
              ],
            },
            runtimeContext,
          },
          options
        );

        console.log('[McpSchedulePostWrapper] Internal tool result:', JSON.stringify(result, null, 2));

        const output = result.output as any;

        console.log('[McpSchedulePostWrapper] Output extracted:', JSON.stringify(output, null, 2));

        if (!output) {
          throw new Error(`No output returned from scheduling tool. Full result: ${JSON.stringify(result)}`);
        }

        if (output.errors) {
          throw new Error(output.errors);
        }

        return {
          result: `Post created successfully, check it here: ${process.env.FRONTEND_URL}/p/${output[0]?.postId}`,
          postId: output[0]?.postId,
        };
      },
    });
  }
}
