#!/usr/bin/env node

/**
 * Postiz MCP stdio Transport Server
 *
 * This bridges Claude Code (stdio transport) to Postiz MCP (SSE transport)
 * Required because Claude Code doesn't support SSE natively.
 */

const http = require('http');
const readline = require('readline');

const API_KEY = process.env.POSTIZ_API_KEY || '439022f2d72a50d6d977103926e15fb215ee7be071d2e7244d57f727a9921c99';
const BASE_URL = process.env.POSTIZ_URL || 'http://localhost:5001';
const SSE_URL = `${BASE_URL}/api/mcp/${API_KEY}/sse`;

// Read from stdin (JSON-RPC requests from Claude Code)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// Process JSON-RPC requests
rl.on('line', async (line) => {
  try {
    const request = JSON.parse(line);

    // Forward to Postiz SSE endpoint via POST
    const response = await fetch(SSE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/event-stream'
      },
      body: JSON.stringify(request)
    });

    // Parse SSE response
    const text = await response.text();

    // Extract JSON from SSE format (event: message\ndata: {...})
    const dataMatch = text.match(/data:\s*({.*})/);
    if (dataMatch) {
      console.log(dataMatch[1]);
    } else {
      console.log(text);
    }
  } catch (error) {
    const errorResponse = {
      jsonrpc: '2.0',
      error: {
        code: -32603,
        message: `Internal error: ${error.message}`
      },
      id: null
    };
    console.log(JSON.stringify(errorResponse));
  }
});

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));
