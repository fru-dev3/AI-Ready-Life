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
  ? join(__dirname, '../../vault-demo/tax')
  : (process.env.TAX_VAULT_PATH || join(process.env.HOME, '.ai/vault/tax-vault'));

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

const server = new Server({ name: 'aireadylife-tax', version: '1.0.0' }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    { name: 'get_tax_brief', description: 'Get current tax status brief including YTD liability, payments, and deadlines', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_deadlines', description: 'Get all upcoming tax deadlines within 90 days with amounts due', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_ytd_liability', description: 'Get year-to-date estimated tax liability and payments made', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_entity_compliance', description: 'Get entity compliance status for LLCs, S-corps, or other business entities', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_deduction_summary', description: 'Get current deduction tracking and top deduction opportunities', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_accountant_readiness', description: 'Get accountant package readiness — what documents are ready and what is missing', inputSchema: { type: 'object', properties: {} } },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;
  const stateFile = readVaultFile('state.md');
  if (!stateFile) return { content: [{ type: 'text', text: `Tax vault not found at ${VAULT_ROOT}. Run: VAULT_MODE=demo npx -y @aireadylife/tax-plugin` }], isError: true };
  switch (name) {
    case 'get_tax_brief': return { content: [{ type: 'text', text: stateFile }] };
    case 'get_deadlines': return { content: [{ type: 'text', text: readVaultFile('deadlines.md') || extractSection(stateFile, '## Deadlines') || 'No deadline data.' }] };
    case 'get_ytd_liability': return { content: [{ type: 'text', text: readVaultFile('estimates/current.md') || extractSection(stateFile, '## YTD Liability') || 'No liability data.' }] };
    case 'get_entity_compliance': return { content: [{ type: 'text', text: readVaultFile('entities/compliance.md') || extractSection(stateFile, '## Entities') || 'No entity data.' }] };
    case 'get_deduction_summary': return { content: [{ type: 'text', text: readVaultFile('deductions/current.md') || extractSection(stateFile, '## Deductions') || 'No deduction data.' }] };
    case 'get_accountant_readiness': return { content: [{ type: 'text', text: readVaultFile('accountant/readiness.md') || extractSection(stateFile, '## Accountant') || 'No readiness data.' }] };
    default: return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
