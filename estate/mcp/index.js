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
  ? join(__dirname, '../../vault-demo/estate')
  : (process.env.ESTATE_VAULT_PATH || join(process.env.HOME, '.ai/vault/estate-vault'));

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

const server = new Server({ name: 'aireadylife-estate', version: '1.0.0' }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    { name: 'get_estate_brief', description: 'Get current estate portfolio brief including cash flow, maintenance, and upcoming deadlines', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_property_summary', description: 'Get summary of all properties — address, equity, tenant status, and lease expiration', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_cash_flow', description: 'Get monthly cash flow per property — rent, PITI, NOI, and net cash flow', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_maintenance_status', description: 'Get open maintenance requests across all properties with priority and status', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_portfolio_metrics', description: 'Get portfolio-level metrics — total equity, total monthly cash flow, and upcoming deadlines', inputSchema: { type: 'object', properties: {} } },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;
  const stateFile = readVaultFile('state.md');
  if (!stateFile) return { content: [{ type: 'text', text: `Estate vault not found at ${VAULT_ROOT}. Run: VAULT_MODE=demo npx -y @aireadylife/estate-plugin` }], isError: true };
  switch (name) {
    case 'get_estate_brief': return { content: [{ type: 'text', text: stateFile }] };
    case 'get_property_summary': return { content: [{ type: 'text', text: readVaultFile('properties/summary.md') || extractSection(stateFile, '## Portfolio Summary') || 'No property data found.' }] };
    case 'get_cash_flow': return { content: [{ type: 'text', text: readVaultFile('cashflow/current.md') || extractSection(stateFile, '## Cash Flow') || 'No cash flow data found.' }] };
    case 'get_maintenance_status': return { content: [{ type: 'text', text: readVaultFile('maintenance/open.md') || extractSection(stateFile, '## Maintenance') || 'No maintenance data found.' }] };
    case 'get_portfolio_metrics': return { content: [{ type: 'text', text: readVaultFile('00_current/metrics.md') || extractSection(stateFile, '## Portfolio') || 'No portfolio metrics found.' }] };
    default: return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
