import { MastraService } from '@gitroom/nestjs-libraries/chat/mastra.service';
import { MCPServer } from '@mastra/mcp';

/**
 * Start MCP server with stdio transport for Claude Code compatibility
 * Claude Code doesn't support SSE, so this provides stdio transport
 */
export async function startMcpStdio(mastraService: MastraService) {
  const mastra = await mastraService.mastra();
  const agent = mastra.getAgent('postiz');
  const tools = await agent.getTools();

  const server = new MCPServer({
    name: 'Postiz MCP',
    version: '1.0.0',
    tools,
    agents: { postiz: agent },
  });

  await server.startStdio();
}
