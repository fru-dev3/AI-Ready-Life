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
  ? join(__dirname, '../../vault-demo/insurance')
  : (process.env.INSURANCE_VAULT_PATH || join(process.env.HOME, '.ai/vault/insurance-vault'));

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

const server = new Server({ name: 'aireadylife-insurance', version: '1.0.0' }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    { name: 'get_insurance_brief', description: 'Get current insurance brief including all policies, premiums, renewal alerts, and coverage gaps', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_coverage_summary', description: 'Get summary of all active insurance policies with premiums, coverage limits, and renewal dates', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_renewal_alerts', description: 'Get policies renewing within 60 days with recommended action steps', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_claims_status', description: 'Get status of all active and recently resolved insurance claims', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_coverage_gaps', description: 'Get coverage gap analysis — areas where current coverage may be insufficient', inputSchema: { type: 'object', properties: {} } },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;
  const stateFile = readVaultFile('state.md');
  if (!stateFile) return { content: [{ type: 'text', text: `Insurance vault not found at ${VAULT_ROOT}. Run: VAULT_MODE=demo npx -y @aireadylife/insurance-plugin` }], isError: true };
  switch (name) {
    case 'get_insurance_brief': return { content: [{ type: 'text', text: stateFile }] };
    case 'get_coverage_summary': return { content: [{ type: 'text', text: readVaultFile('00_current/policies.md') || extractSection(stateFile, '## All Policies') || 'No policy data found.' }] };
    case 'get_renewal_alerts': return { content: [{ type: 'text', text: readVaultFile('00_current/renewal-alerts.md') || extractSection(stateFile, '## Renewal Alerts') || 'No renewal alerts found.' }] };
    case 'get_claims_status': return { content: [{ type: 'text', text: readVaultFile('02_claims/active.md') || extractSection(stateFile, '## Active Claims') || 'No active claims found.' }] };
    case 'get_coverage_gaps': return { content: [{ type: 'text', text: readVaultFile('00_current/gap-analysis.md') || extractSection(stateFile, '## Coverage Gap Analysis') || 'No gap analysis found.' }] };
    default: return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
