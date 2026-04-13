#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const VAULT_MODE = process.env.VAULT_MODE || 'live';
const VAULT_ROOT = VAULT_MODE === 'demo'
  ? join(__dirname, '../../vault-demo/explore')
  : (process.env.EXPLORE_VAULT_PATH || join(process.env.HOME, '.ai/vault/explore-vault'));

function readVaultFile(path) {
  const fullPath = join(VAULT_ROOT, path);
  if (!existsSync(fullPath)) return null;
  return readFileSync(fullPath, 'utf-8');
}

function extractSection(content, heading) {
  const lines = content.split('\n');
  const start = lines.findIndex(l => l.startsWith(heading));
  if (start === -1) return null;
  const end = lines.findIndex((l, i) => i > start && l.startsWith('## '));
  return lines.slice(start, end === -1 ? undefined : end).join('\n');
}

const server = new Server({ name: 'aireadylife-explore', version: '1.0.0' }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    { name: 'get_explore_brief', description: 'Get current explore brief including upcoming trips, document status, and travel wishlist', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_upcoming_adventures', description: 'Get all upcoming booked trips with dates, status, and preparation checklist', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_travel_wishlist', description: 'Get travel wishlist with destination ideas, estimated budgets, and timing', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_passport_status', description: 'Get all travel document expiration dates and any renewal alerts', inputSchema: { type: 'object', properties: {} } },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;
  const stateFile = readVaultFile('state.md');
  if (!stateFile) return { content: [{ type: 'text', text: `Explore vault not found at ${VAULT_ROOT}. Run: VAULT_MODE=demo npx -y @aireadylife/explore-plugin` }], isError: true };
  switch (name) {
    case 'get_explore_brief': return { content: [{ type: 'text', text: stateFile }] };
    case 'get_upcoming_adventures': return { content: [{ type: 'text', text: readVaultFile('trips/upcoming.md') || extractSection(stateFile, '## Upcoming Trips') || 'No upcoming trips found.' }] };
    case 'get_travel_wishlist': return { content: [{ type: 'text', text: readVaultFile('wishlist/destinations.md') || extractSection(stateFile, '## Wishlist') || 'No wishlist data found.' }] };
    case 'get_passport_status': return { content: [{ type: 'text', text: readVaultFile('documents/status.md') || extractSection(stateFile, '## Documents') || 'No document data found.' }] };
    default: return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
