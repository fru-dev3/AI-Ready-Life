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
  ? join(__dirname, '../../vault-demo/business')
  : (process.env.BUSINESS_VAULT_PATH || join(process.env.HOME, '.ai/vault/business-vault'));

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

const server = new Server({ name: 'aireadylife-business', version: '1.0.0' }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'get_business_brief',
      description: 'Get the full business state including entities, P&L, and compliance status',
      inputSchema: { type: 'object', properties: {}, required: [] }
    },
    {
      name: 'get_revenue_summary',
      description: 'Get revenue by stream, YTD totals, and invoicing status',
      inputSchema: { type: 'object', properties: {}, required: [] }
    },
    {
      name: 'get_compliance_status',
      description: 'Get entity compliance status: annual reports, registered agent, and filing deadlines',
      inputSchema: { type: 'object', properties: {}, required: [] }
    },
    {
      name: 'get_expense_summary',
      description: 'Get expenses by category, YTD totals, and deductibility notes',
      inputSchema: { type: 'object', properties: {}, required: [] }
    },
    {
      name: 'get_entity_status',
      description: 'Get status of all business entities with compliance health check',
      inputSchema: { type: 'object', properties: {}, required: [] }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;
  const stateFile = readVaultFile('state.md');
  if (!stateFile) return { content: [{ type: 'text', text: `Business vault not found at ${VAULT_ROOT}. Run: VAULT_MODE=demo npx -y @aireadylife/business-plugin` }], isError: true };
  switch (name) {
    case 'get_business_brief': return { content: [{ type: 'text', text: stateFile }] };
    case 'get_revenue_summary': {
      const section = extractSection(stateFile, '## P&L') || extractSection(stateFile, '## YTD');
      return { content: [{ type: 'text', text: section || 'No revenue section found.' }] };
    }
    case 'get_compliance_status': {
      const entitiesSection = extractSection(stateFile, '## Entities');
      const openSection = extractSection(stateFile, '## Open Items');
      const combined = [entitiesSection, openSection].filter(Boolean).join('\n\n');
      return { content: [{ type: 'text', text: combined || 'No compliance section found.' }] };
    }
    case 'get_expense_summary': {
      const section = extractSection(stateFile, '## P&L');
      return { content: [{ type: 'text', text: section || 'No expense section found.' }] };
    }
    case 'get_entity_status': {
      const section = extractSection(stateFile, '## Entities');
      return { content: [{ type: 'text', text: section || 'No entity section found.' }] };
    }
    default: return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
