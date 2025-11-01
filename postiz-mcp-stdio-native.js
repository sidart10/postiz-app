#!/usr/bin/env node

/**
 * Postiz MCP Native stdio Server
 * Loads Postiz backend and uses Mastra's native stdio transport
 */

// Set required environment variables
process.env.DATABASE_URL = process.env.DATABASE_URL || "postgresql://postiz-user:postiz-password@localhost:5432/postiz-db-local";
process.env.REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";
process.env.NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001/api";
process.env.IS_GENERAL = "true";

async function main() {
  try {
    console.error('[Postiz MCP Native] Loading backend modules...');

    // This requires the compiled backend dist folder
    const backendPath = '/Users/sid/Desktop/4. Coding Projects/Postiz/postiz-app/apps/backend/dist';

    // Try to load the MastraService
    const { MastraService } = require(`${backendPath}/libraries/nestjs-libraries/src/chat/mastra.service`);
    const { MCPServer } = require('/Users/sid/Desktop/4. Coding Projects/Postiz/postiz-app/node_modules/@mastra/mcp');

    console.error('[Postiz MCP Native] Creating Mastra service...');

    const mastraService = new MastraService();
    const mastra = await mastraService.mastra();
    const agent = mastra.getAgent('postiz');
    const tools = await agent.getTools();

    console.error(`[Postiz MCP Native] Loaded ${Object.keys(tools).length} tools`);

    const server = new MCPServer({
      name: 'Postiz MCP',
      version: '1.0.0',
      tools,
      agents: { postiz: agent },
    });

    console.error('[Postiz MCP Native] Starting stdio transport...');
    await server.startStdio();

  } catch (error) {
    console.error('[Postiz MCP Native] Error:', error.message);
    console.error('[Postiz MCP Native] Stack:', error.stack);
    process.exit(1);
  }
}

main();
