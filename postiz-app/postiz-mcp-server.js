#!/usr/bin/env node

/**
 * Postiz MCP Server - Production stdio Implementation
 * Runs inside Docker container with direct database access
 */

const { PrismaClient } = require('@prisma/client');

console.error('[Postiz MCP] Starting...');

async function main() {
  try {
    const apiKey = process.env.POSTIZ_API_KEY || '8e016ebccd6f56eea7fbfe1e7acd79103661f8e10407eff9a9b2c78fa531388d';

    // Initialize Prisma
    const prisma = new PrismaClient();
    await prisma.$connect();
    console.error('[Postiz MCP] Database connected');

    // Verify API key and get organization
    const user = await prisma.user.findUnique({
      where: { apiKey },
      include: { organization: true }
    });

    if (!user || !user.organization) {
      console.error('[Postiz MCP] ERROR: Invalid API key');
      await prisma.$disconnect();
      process.exit(1);
    }

    const organization = user.organization;
    console.error('[Postiz MCP] Authenticated:', organization.name || organization.id);

    // Load Mastra modules
    const { MastraService } = require('/app/apps/backend/dist/libraries/nestjs-libraries/src/chat/mastra.service');
    const { MCPServer } = require('@mastra/mcp');
    const { runWithContext } = require('/app/apps/backend/dist/libraries/nestjs-libraries/src/chat/async.storage');

    // Initialize Mastra and tools
    const mastraService = new MastraService();
    const mastra = await mastraService.mastra();
    const agent = mastra.getAgent('postiz');
    const tools = await agent.getTools();

    console.error('[Postiz MCP] Tools loaded:', Object.keys(tools).length);
    Object.keys(tools).forEach((name, i) => {
      if (i < 5) console.error(`[Postiz MCP]   ${i+1}. ${name}`);
    });
    if (Object.keys(tools).length > 5) {
      console.error(`[Postiz MCP]   ... and ${Object.keys(tools).length - 5} more`);
    }

    // Create MCP Server
    const server = new MCPServer({
      name: 'Postiz MCP',
      version: '1.0.0',
      tools,
      agents: { postiz: agent },
    });

    console.error('[Postiz MCP] Ready - starting stdio transport');

    // Run with organization context
    await runWithContext(
      { requestId: 'stdio-mcp', auth: organization },
      async () => {
        await server.startStdio();
      }
    );

  } catch (error) {
    console.error('[Postiz MCP] FATAL:', error.message);
    if (error.stack) console.error(error.stack);
    process.exit(1);
  }
}

main();
