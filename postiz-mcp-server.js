#!/usr/bin/env node

/**
 * Postiz MCP stdio Server - Production Quality
 * Synchronous HTTP-to-stdio proxy with proper session management
 */

const http = require('http');
const readline = require('readline');

const API_KEY = process.env.POSTIZ_API_KEY || '8e016ebccd6f56eea7fbfe1e7acd79103661f8e10407eff9a9b2c78fa531388d';
const MCP_URL = `http://localhost:5001/api/mcp/${API_KEY}`;

console.error('[Postiz MCP] Starting stdio-to-HTTP proxy');
console.error('[Postiz MCP] Backend:', MCP_URL.substring(0, 60) + '...');

let sessionId = null;
let requestQueue = [];
let processing = false;

function sendHttpRequest(jsonRpcMessage) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(jsonRpcMessage);

    const req = http.request(MCP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/event-stream',
        'Content-Length': Buffer.byteLength(postData),
        ...(sessionId ? { 'mcp-session-id': sessionId } : {})
      }
    }, (res) => {
      // Capture session ID from response headers
      if (res.headers['mcp-session-id']) {
        sessionId = res.headers['mcp-session-id'];
        console.error('[Postiz MCP] Session ID:', sessionId.substring(0, 12) + '...');
      }

      let data = '';
      res.on('data', (chunk) => { data += chunk.toString(); });
      res.on('end', () => {
        // Parse SSE format: "event: message\ndata: {...}"
        const match = data.match(/data:\s*(\{.*\})/s);
        if (match) {
          try {
            resolve(JSON.parse(match[1]));
          } catch (e) {
            reject(new Error('JSON parse failed: ' + match[1].substring(0, 100)));
          }
        } else if (data.trim().startsWith('{')) {
          try {
            resolve(JSON.parse(data.trim()));
          } catch (e) {
            reject(new Error('Direct JSON parse failed'));
          }
        } else {
          reject(new Error('Unexpected response format: ' + data.substring(0, 100)));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function processRequestQueue() {
  if (processing || requestQueue.length === 0) return;
  
  processing = true;

  while (requestQueue.length > 0) {
    const request = requestQueue.shift();

    try {
      console.error(`[Postiz MCP] → ${request.method} (id: ${request.id})`);
      
      const response = await sendHttpRequest(request);
      
      console.log(JSON.stringify(response));
      console.error(`[Postiz MCP] ✓ ${request.method} completed`);

    } catch (error) {
      console.error(`[Postiz MCP] ✗ ${request.method} failed:`, error.message);
      
      const errorResponse = {
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: `Proxy error: ${error.message}`
        },
        id: request.id
      };
      console.log(JSON.stringify(errorResponse));
    }
  }

  processing = false;
}

// stdio protocol handler
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

rl.on('line', (line) => {
  try {
    const request = JSON.parse(line);
    requestQueue.push(request);
    setImmediate(processRequestQueue);
  } catch (error) {
    console.error('[Postiz MCP] Parse error:', error.message);
    const errorResponse = {
      jsonrpc: '2.0',
      error: { code: -32700, message: `Parse error: ${error.message}` },
      id: null
    };
    console.log(JSON.stringify(errorResponse));
  }
});

console.error('[Postiz MCP] Ready for stdio requests');

process.on('SIGINT', () => {
  console.error('[Postiz MCP] Shutting down');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error('[Postiz MCP] Shutting down');
  process.exit(0);
});
