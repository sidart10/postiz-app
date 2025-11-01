#!/bin/bash

# Postiz MCP stdio Wrapper
# Runs the native MCP server inside the Docker container via docker-compose exec

cd "$(dirname "$0")"

# Use docker-compose exec to run Node.js inside the container with access to database/redis
docker-compose exec -T postiz node /app/postiz-mcp-server.js
