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
  ? join(__dirname, '../../vault-demo/benefits')
  : (process.env.BENEFITS_VAULT_PATH || join(process.env.HOME, '.ai/vault/benefits-vault'));

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

const server = new Server({ name: 'aireadylife-benefits', version: '1.0.0' }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'get_benefits_brief',
      description: 'Get the full benefits state including 401k, HSA, and coverage summary',
      inputSchema: { type: 'object', properties: {}, required: [] }
    },
    {
      name: 'get_401k_status',
      description: 'Get 401k balance, YTD contributions, employer match capture status, and allocation',
      inputSchema: { type: 'object', properties: {}, required: [] }
    },
    {
      name: 'get_hsa_balance',
      description: 'Get HSA balance, YTD contributions, investment threshold status, and remaining limit',
      inputSchema: { type: 'object', properties: {}, required: [] }
    },
    {
      name: 'get_coverage_summary',
      description: 'Get health, dental, vision, life, and disability coverage summary',
      inputSchema: { type: 'object', properties: {}, required: [] }
    },
    {
      name: 'get_enrollment_deadlines',
      description: 'Get open enrollment dates, upcoming benefit deadlines, and action items',
      inputSchema: { type: 'object', properties: {}, required: [] }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;
  const stateFile = readVaultFile('state.md');
  if (!stateFile) return { content: [{ type: 'text', text: `Benefits vault not found at ${VAULT_ROOT}. Run: VAULT_MODE=demo npx -y @aireadylife/benefits-plugin` }], isError: true };
  switch (name) {
    case 'get_benefits_brief': return { content: [{ type: 'text', text: stateFile }] };
    case 'get_401k_status': {
      const section = extractSection(stateFile, '## 401k');
      return { content: [{ type: 'text', text: section || 'No 401k section found.' }] };
    }
    case 'get_hsa_balance': {
      const section = extractSection(stateFile, '## HSA');
      return { content: [{ type: 'text', text: section || 'No HSA section found.' }] };
    }
    case 'get_coverage_summary': {
      const section = extractSection(stateFile, '## Coverage');
      return { content: [{ type: 'text', text: section || 'No coverage section found.' }] };
    }
    case 'get_enrollment_deadlines': {
      const section = extractSection(stateFile, '## Open Enrollment') || extractSection(stateFile, '## Open Items');
      return { content: [{ type: 'text', text: section || 'No enrollment section found.' }] };
    }
    default: return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
