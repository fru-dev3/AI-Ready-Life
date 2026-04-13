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
  ? join(__dirname, '../../vault-demo/home')
  : (process.env.HOME_VAULT_PATH || join(process.env.HOME, '.ai/vault/home-vault'));

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

const server = new Server({ name: 'aireadylife-home', version: '1.0.0' }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    { name: 'get_home_brief', description: 'Get current home brief including open maintenance, seasonal tasks, and home expenses', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_maintenance_status', description: 'Get all open maintenance items with priority, status, and vendor information', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_home_expenses', description: 'Get current month home expenses by category vs. prior month', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_seasonal_tasks', description: 'Get seasonal task checklist for the current quarter with completion status', inputSchema: { type: 'object', properties: {} } },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;
  const stateFile = readVaultFile('state.md');
  if (!stateFile) return { content: [{ type: 'text', text: `Home vault not found at ${VAULT_ROOT}. Run: VAULT_MODE=demo npx -y @aireadylife/home-plugin` }], isError: true };
  switch (name) {
    case 'get_home_brief': return { content: [{ type: 'text', text: stateFile }] };
    case 'get_maintenance_status': return { content: [{ type: 'text', text: readVaultFile('maintenance/open.md') || extractSection(stateFile, '## Open Maintenance') || 'No maintenance data found.' }] };
    case 'get_home_expenses': return { content: [{ type: 'text', text: readVaultFile('expenses/current.md') || extractSection(stateFile, '## Home Expenses') || 'No expense data found.' }] };
    case 'get_seasonal_tasks': return { content: [{ type: 'text', text: readVaultFile('seasonal/current.md') || extractSection(stateFile, '## Seasonal Tasks') || 'No seasonal task data found.' }] };
    default: return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
