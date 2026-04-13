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
  ? join(__dirname, '../../vault-demo/wealth')
  : (process.env.WEALTH_VAULT_PATH || join(process.env.HOME, '.ai/vault/wealth-vault'));

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

const server = new Server({ name: 'aireadylife-wealth', version: '1.0.0' }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    { name: 'get_wealth_brief', description: 'Get current wealth status brief including net worth, cash flow, and investment summary', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_net_worth', description: 'Get current net worth breakdown by account and asset type', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_cash_flow', description: 'Get income vs. expenses analysis for the current month', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_investment_summary', description: 'Get investment account balances and recent performance', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_estate_status', description: 'Get estate planning document status and any gaps', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_debt_summary', description: 'Get outstanding debt balances, interest rates, and payoff timeline', inputSchema: { type: 'object', properties: {} } },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;
  const stateFile = readVaultFile('state.md');
  if (!stateFile) return { content: [{ type: 'text', text: `Wealth vault not found at ${VAULT_ROOT}. Run: VAULT_MODE=demo npx -y @aireadylife/wealth-plugin` }], isError: true };
  switch (name) {
    case 'get_wealth_brief': return { content: [{ type: 'text', text: stateFile }] };
    case 'get_net_worth': return { content: [{ type: 'text', text: readVaultFile('networth/current.md') || extractSection(stateFile, '## Net Worth') || 'No net worth data.' }] };
    case 'get_cash_flow': return { content: [{ type: 'text', text: readVaultFile('cashflow/current.md') || extractSection(stateFile, '## Cash Flow') || 'No cash flow data.' }] };
    case 'get_investment_summary': return { content: [{ type: 'text', text: readVaultFile('investments/summary.md') || extractSection(stateFile, '## Investments') || 'No investment data.' }] };
    case 'get_estate_status': return { content: [{ type: 'text', text: readVaultFile('estate/status.md') || extractSection(stateFile, '## Estate') || 'No estate data.' }] };
    case 'get_debt_summary': return { content: [{ type: 'text', text: readVaultFile('debt/summary.md') || extractSection(stateFile, '## Debt') || 'No debt data.' }] };
    default: return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
