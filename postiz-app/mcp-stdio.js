#!/usr/bin/env node

/**
 * Postiz MCP stdio Entry Point
 * Standalone stdio server for Claude Code compatibility
 *
 * Usage: node mcp-stdio.js
 * Or from .mcp.json: { "command": "node", "args": ["/path/to/mcp-stdio.js"] }
 */

const { spawn } = require('child_process');
const readline = require('readline');

// Start Postiz backend if not already running
console.error('[Postiz MCP stdio] Starting...');
console.error('[Postiz MCP stdio] Connecting to http://localhost:5001');

// Import the compiled stdio starter
const startStdio = async () => {
  try {
    // This requires the app to be built first
    const { startMcpStdio } = require('./apps/backend/dist/libraries/nestjs-libraries/src/chat/start.mcp.stdio');

    // We need MastraService instance - this won't work standalone
    // Alternative: Shell out to the backend with a special CLI flag
    console.error('[Postiz MCP stdio] ERROR: Cannot run standalone without NestJS');
    console.error('[Postiz MCP stdio] Please use the bridge script instead');
    process.exit(1);
  } catch (error) {
    console.error('[Postiz MCP stdio] ERROR:', error.message);
    process.exit(1);
  }
};

startStdio();
