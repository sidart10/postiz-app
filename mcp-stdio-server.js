#!/usr/bin/env node

/**
 * Postiz MCP stdio-to-SSE Bridge
 * Maintains persistent SSE connection while providing stdio interface for Claude Code
 */

const http = require('http');
const readline = require('readline');
const { URL } = require('url');
const { EventEmitter } = require('events');

const API_KEY = process.env.POSTIZ_API_KEY || '439022f2d72a50d6d977103926e15fb215ee7be071d2e7244d57f727a9921c99';
const BASE_URL = process.env.POSTIZ_URL || 'http://localhost:5001';
const SSE_URL = `${BASE_URL}/api/mcp/${API_KEY}`;

class SSEBridge extends EventEmitter {
  constructor() {
    super();
    this.buffer = '';
    this.req = null;
    this.sessionId = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      const url = new URL(SSE_URL);

      this.req = http.request({
        hostname: url.hostname,
        port: url.port || 80,
        path: url.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/event-stream',
          'Connection': 'keep-alive'
        }
      });

      this.req.on('response', (res) => {
        res.setEncoding('utf8');

        res.on('data', (chunk) => {
          this.buffer += chunk;
          this.processBuffer();
        });

        res.on('end', () => {
          console.error('[SSE Bridge] Connection closed');
          this.emit('close');
        });

        res.on('error', (error) => {
          console.error('[SSE Bridge] Response error:', error);
          this.emit('error', error);
        });

        resolve();
      });

      this.req.on('error', (error) => {
        console.error('[SSE Bridge] Request error:', error);
        reject(error);
      });
    });
  }

  processBuffer() {
    const events = this.buffer.split('\n\n');
    this.buffer = events.pop() || '';

    events.forEach(eventText => {
      const lines = eventText.split('\n');
      let data = '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          data = line.substring(6);
        }
      }

      if (data) {
        try {
          const message = JSON.parse(data);
          this.emit('message', message);
        } catch (e) {
          console.error('[SSE Bridge] Failed to parse message:', data);
        }
      }
    });
  }

  send(message) {
    if (!this.req) {
      throw new Error('Not connected');
    }
    this.req.write(JSON.stringify(message) + '\n');
  }

  close() {
    if (this.req) {
      this.req.end();
    }
  }
}

// Main stdio loop
async function main() {
  console.error('[Postiz MCP Bridge] Starting...');
  console.error('[Postiz MCP Bridge] Connecting to:', SSE_URL);

  const bridge = new SSEBridge();
  const pendingRequests = new Map();

  bridge.on('message', (message) => {
    if (message.id && pendingRequests.has(message.id)) {
      const { resolve } = pendingRequests.get(message.id);
      pendingRequests.delete(message.id);
      resolve(message);
    }
    // Always output message to stdout for stdio protocol
    console.log(JSON.stringify(message));
  });

  bridge.on('error', (error) => {
    console.error('[Postiz MCP Bridge] Error:', error.message);
  });

  bridge.on('close', () => {
    console.error('[Postiz MCP Bridge] Connection closed');
    process.exit(0);
  });

  try {
    await bridge.connect();
    console.error('[Postiz MCP Bridge] Connected successfully');
  } catch (error) {
    console.error('[Postiz MCP Bridge] Failed to connect:', error.message);
    process.exit(1);
  }

  // Read from stdin
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  rl.on('line', async (line) => {
    try {
      const request = JSON.parse(line);
      console.error(`[Postiz MCP Bridge] Request: ${request.method} (id: ${request.id})`);

      bridge.send(request);

      // For requests that expect responses, wait for them
      if (request.id) {
        await new Promise((resolve) => {
          pendingRequests.set(request.id, { resolve });
        });
      }
    } catch (error) {
      console.error(`[Postiz MCP Bridge] Error processing request:`, error.message);
      const errorResponse = {
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: `Bridge error: ${error.message}`
        },
        id: request?.id || null
      };
      console.log(JSON.stringify(errorResponse));
    }
  });

  process.on('SIGINT', () => {
    console.error('[Postiz MCP Bridge] Shutting down');
    bridge.close();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.error('[Postiz MCP Bridge] Shutting down');
    bridge.close();
    process.exit(0);
  });
}

main().catch((error) => {
  console.error('[Postiz MCP Bridge] Fatal error:', error);
  process.exit(1);
});
