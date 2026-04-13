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
  ? join(__dirname, '../../vault-demo/career')
  : (process.env.CAREER_VAULT_PATH || join(process.env.HOME, '.ai/vault/career-vault'));

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

const server = new Server({ name: 'aireadylife-career', version: '1.0.0' }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    { name: 'get_career_brief', description: 'Get current career status brief including market position, pipeline, and next actions', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_comp_vs_market', description: 'Get compensation benchmarking — current comp vs. market percentile for your role and location', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_pipeline_status', description: 'Get active application pipeline status — applications, interviews, and follow-ups', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_skills_gaps', description: 'Get skills gap analysis comparing current skills to target role requirements', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_network_outreach', description: 'Get warm contact list and recommended outreach actions', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_income_summary', description: 'Get total compensation breakdown including base, bonus, equity, and other income', inputSchema: { type: 'object', properties: {} } },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;
  const stateFile = readVaultFile('state.md');
  if (!stateFile) return { content: [{ type: 'text', text: `Career vault not found at ${VAULT_ROOT}. Run: VAULT_MODE=demo npx -y @aireadylife/career-plugin` }], isError: true };
  switch (name) {
    case 'get_career_brief': return { content: [{ type: 'text', text: stateFile }] };
    case 'get_comp_vs_market': return { content: [{ type: 'text', text: readVaultFile('compensation/benchmark.md') || extractSection(stateFile, '## Compensation') || 'No comp data.' }] };
    case 'get_pipeline_status': return { content: [{ type: 'text', text: readVaultFile('pipeline/status.md') || extractSection(stateFile, '## Pipeline') || 'No pipeline data.' }] };
    case 'get_skills_gaps': return { content: [{ type: 'text', text: readVaultFile('market/skills-gaps.md') || extractSection(stateFile, '## Skills Gaps') || 'No skills gap data.' }] };
    case 'get_network_outreach': return { content: [{ type: 'text', text: readVaultFile('network/outreach.md') || extractSection(stateFile, '## Network') || 'No network data.' }] };
    case 'get_income_summary': return { content: [{ type: 'text', text: readVaultFile('compensation/income.md') || extractSection(stateFile, '## Income') || 'No income data.' }] };
    default: return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
