# Introduction

This document outlines the complete fullstack architecture for **Postiz Self-Hosted Deployment with MCP Integration**, including backend systems, frontend implementation, and their integration. It serves as the single source of truth for AI-driven development, ensuring consistency across the entire technology stack.

This unified approach combines what would traditionally be separate backend and frontend architecture documents, streamlining the development process for modern fullstack applications where these concerns are increasingly intertwined.

## Starter Template or Existing Project

**Existing Project: Postiz Open Source Platform (Brownfield Deployment)**

This project is based on the existing Postiz open-source application (github.com/gitroomhq/postiz-app, 24.1k GitHub stars). We are deploying a pre-built, mature platform rather than building from scratch.

**Key Architectural Constraints:**

- **Pre-configured Tech Stack:** NX monorepo, NestJS backend, Next.js frontend, PostgreSQL, Redis, BullMQ
- **Deployment Model:** Using official Docker images (`ghcr.io/gitroomhq/postiz-app:latest`)
- **Customization Approach:** Fork for version control, but primarily configuration-based customization
- **Modification Scope:** OAuth credentials, environment variables, MCP integration endpoints
- **Cannot Modify:** Core Postiz architecture, service structure, or internal implementations without custom builds

**What This Means for Architecture:**

- Architecture document focuses on **deployment architecture**, **integration patterns**, and **MCP extension layer**
- Tech stack section reflects Postiz's choices (already decided)
- Component diagrams show Postiz's existing structure plus our MCP integration layer
- Development workflow emphasizes configuration management and deployment over coding

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-10-28 | 0.1 | Initial architecture document creation based on PRD v0.1 | Winston (Architect) |

---
