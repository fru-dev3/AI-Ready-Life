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
  ? join(__dirname, '../../vault-demo/ben')
  : (process.env.BEN_VAULT_PATH || join(process.env.HOME, '.ai/vault/ben-vault'));

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

const server = new Server({ name: 'aireadylife-ben', version: '1.0.0' }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'get_ben_brief',
      description: 'Get the current life OS executive brief across all installed plugins',
      inputSchema: { type: 'object', properties: {}, required: [] }
    },
    {
      name: 'get_morning_brief',
      description: "Get today's morning brief with domain alerts and top actions",
      inputSchema: { type: 'object', properties: {}, required: [] }
    },
    {
      name: 'get_open_loops',
      description: 'Get all open items across all installed life plugins',
      inputSchema: { type: 'object', properties: {}, required: [] }
    },
    {
      name: 'get_system_health',
      description: 'Get health status of all installed plugins and their vaults',
      inputSchema: { type: 'object', properties: {}, required: [] }
    },
    {
      name: 'get_domain_alerts',
      description: 'Get urgent alerts from any installed plugin that need attention',
      inputSchema: { type: 'object', properties: {}, required: [] }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;
  const stateFile = readVaultFile('state.md');
  if (!stateFile) return { content: [{ type: 'text', text: `Ben vault not found at ${VAULT_ROOT}. Run: VAULT_MODE=demo npx -y @aireadylife/ben-plugin` }], isError: true };
  switch (name) {
    case 'get_ben_brief': return { content: [{ type: 'text', text: stateFile }] };
    case 'get_morning_brief': {
      const section = extractSection(stateFile, "## Today's Focus");
      return { content: [{ type: 'text', text: section || stateFile }] };
    }
    case 'get_open_loops': {
      const section = extractSection(stateFile, '## Open Loops') || extractSection(stateFile, '## Domain Alerts');
      return { content: [{ type: 'text', text: section || 'No open loops section found.' }] };
    }
    case 'get_system_health': {
      const section = extractSection(stateFile, '## System Health');
      return { content: [{ type: 'text', text: section || 'No system health section found.' }] };
    }
    case 'get_domain_alerts': {
      const section = extractSection(stateFile, '## Domain Alerts');
      return { content: [{ type: 'text', text: section || 'No domain alerts found.' }] };
    }
    default: return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
