#!/usr/bin/env node

/**
 * Postiz MCP stdio Bridge (Stateless - Fast Response)
 */

const http = require('http');
const readline = require('readline');

const API_KEY = process.env.POSTIZ_API_KEY || '8e016ebccd6f56eea7fbfe1e7acd79103661f8e10407eff9a9b2c78fa531388d';
const MCP_URL = `http://localhost:5001/api/mcp/${API_KEY}`;

console.error('[Postiz MCP] Ready');

const rl = readline.createInterface({ input: process.stdin, terminal: false });

rl.on('line', (line) => {
  const request = JSON.parse(line);
  const postData = JSON.stringify(request);

  const req = http.request(MCP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream',
      'Content-Length': Buffer.byteLength(postData)
    }
  }, (res) => {
    let data = '';
    res.on('data', (c) => { data += c; });
    res.on('end', () => {
      const m = data.match(/data:\s*(\{.*\})/s);
      if (m) console.log(m[1]);
      else if (data.trim().startsWith('{')) console.log(data.trim());
      else console.log(JSON.stringify({jsonrpc:'2.0',error:{code:-32603,message:'Bad response'},id:request.id}));
    });
  });

  req.on('error', (e) => {
    console.log(JSON.stringify({jsonrpc:'2.0',error:{code:-32603,message:e.message},id:request.id}));
  });

  req.write(postData);
  req.end();
});
