# Cloudflare AI Chat Agent

[![Deploy to Cloudflare][![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/imISHANMALIK/stratagem-ai-agentic-e-commerce-decision-engine)]

A production-ready, full-stack AI chat application built with Cloudflare Workers, Durable Objects, and Agents SDK. Features multi-session conversations, streaming responses, tool calling (weather, web search, MCP integration), and a modern React frontend with shadcn/ui.

## Features

- **Multi-Session Chat**: Persistent conversations powered by Durable Objects and Agents SDK
- **AI Integration**: Cloudflare AI Gateway with Gemini models (configurable)
- **Tool Calling**: Built-in tools for weather, web search (SerpAPI), and extensible MCP support
- **Streaming Responses**: Real-time chat with SSE support
- **Session Management**: Create, list, update, and delete chats with automatic title generation
- **Modern UI**: React 18, TypeScript, Tailwind CSS, shadcn/ui components
- **Type-Safe**: Full TypeScript coverage across frontend and Workers
- **Production-Ready**: CORS, logging, error handling, health checks

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack Query, Lucide Icons
- **Backend**: Cloudflare Workers, Hono, Durable Objects, Agents SDK
- **AI/ML**: Cloudflare AI Gateway, OpenAI SDK, Gemini models
- **Tools**: SerpAPI (web search), MCP (Model Context Protocol)
- **Build Tools**: Bun, Wrangler, Vite
- **UI/UX**: Framer Motion, Sonner (toasts), Sidebar layout

## Prerequisites

- [Bun](https://bun.sh/) (package manager)
- [Cloudflare Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install/)
- Cloudflare account with Workers AI Gateway configured
- Optional: SerpAPI key for web search, MCP server for advanced tools

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Configure environment variables in `wrangler.jsonc`:
   ```json
   {
     "vars": {
       "CF_AI_BASE_URL": "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai",
       "CF_AI_API_KEY": "{your_ai_gateway_token}",
       "SERPAPI_KEY": "{optional_serpapi_key}"
     }
   }
   ```
4. Generate Worker types:
   ```bash
   bun run cf-typegen
   ```

## Development

Start the development server:
```bash
bun dev
```

- Frontend: `http://localhost:3000`
- API: `http://localhost:3000/api/health` (test endpoint)
- Full-TypeScript hot reload with Vite and Workers

Edit `src/pages/HomePage.tsx` for UI changes and `worker/userRoutes.ts` for custom API routes.

## Usage

### Chat Features
- Create new sessions: `POST /api/sessions`
- List sessions: `GET /api/sessions`
- Send messages: `POST /api/chat/{sessionId}/chat`
- Switch models: `POST /api/chat/{sessionId}/model`
- Clear chat: `DELETE /api/chat/{sessionId}/clear`

### Tools
- `get_weather`: Location-based weather (demo)
- `web_search`: Google search via SerpAPI
- Custom MCP tools: Extend via `worker/mcp-client.ts`

Example frontend integration uses `src/lib/chat.ts` service.

## Deployment

1. Build assets:
   ```bash
   bun run build
   ```
2. Deploy to Cloudflare:
   ```bash
   bun run deploy
   ```

Or use the one-click deploy:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/imISHANMALIK/stratagem-ai-agentic-e-commerce-decision-engine)

**Custom Domain**: Update `wrangler.jsonc` with `route` patterns after deployment.

**Environment Variables**: Set in Cloudflare dashboard under Workers > Settings > Variables.

## Configuration

### AI Gateway
Create a Gateway at [dash.cloudflare.com](https://dash.cloudflare.com) → AI → Gateways → Create Gateway. Update `CF_AI_BASE_URL`.

### Models
Edit `MODELS` in `src/lib/chat.ts` and default in `worker/agent.ts`.

### Extending Tools
- Custom tools: `worker/tools.ts`
- MCP servers: Add to `MCP_SERVERS` in `worker/mcp-client.ts`

## Troubleshooting

- **Type errors**: Run `bun run cf-typegen`
- **Build issues**: Clear `.tmp` folder and `bun install`
- **AI Gateway 401**: Verify token and Gateway URL
- **Linting**: `bun run lint`

## Contributing

1. Fork and clone
2. `bun install`
3. Create feature branch
4. `bun dev` and test
5. PR with clear description

## License

MIT License. See [LICENSE](LICENSE) for details.

---

Built with ❤️ for Cloudflare Workers. Questions? [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)