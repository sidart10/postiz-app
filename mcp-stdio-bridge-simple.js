#!/usr/bin/env node
const http = require('http');
const readline = require('readline');

const API_KEY = process.env.POSTIZ_API_KEY || '439022f2d72a50d6d977103926e15fb215ee7be071d2e7244d57f727a9921c99';
const URL = `http://localhost:5001/api/mcp/${API_KEY}`;

const rl = readline.createInterface({ input: process.stdin, terminal: false });

rl.on('line', async (line) => {
  try {
    const req = JSON.parse(line);
    
    const postData = JSON.stringify(req);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/event-stream',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const httpReq = http.request(URL, options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const match = data.match(/data:\s*(\{.*\})/);
        if (match) {
          console.log(match[1]);
        } else {
          console.log(data);
        }
      });
    });

    httpReq.on('error', (e) => {
      console.log(JSON.stringify({jsonrpc:'2.0',error:{code:-32603,message:e.message},id:req.id}));
    });

    httpReq.write(postData);
    httpReq.end();
  } catch (e) {
    console.log(JSON.stringify({jsonrpc:'2.0',error:{code:-32700,message:e.message},id:null}));
  }
});
