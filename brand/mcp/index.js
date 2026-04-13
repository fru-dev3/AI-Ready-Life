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
  ? join(__dirname, '../../vault-demo/brand')
  : (process.env.BRAND_VAULT_PATH || join(process.env.HOME, '.ai/vault/brand-vault'));

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

const server = new Server({ name: 'aireadylife-brand', version: '1.0.0' }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'get_brand_brief',
      description: 'Get the full brand state including health score, analytics, and open items',
      inputSchema: { type: 'object', properties: {}, required: [] }
    },
    {
      name: 'get_analytics_summary',
      description: 'Get cross-platform analytics: followers, views, engagement, and MoM trends',
      inputSchema: { type: 'object', properties: {}, required: [] }
    },
    {
      name: 'get_mention_summary',
      description: 'Get recent brand mentions with sentiment classification',
      inputSchema: { type: 'object', properties: {}, required: [] }
    },
    {
      name: 'get_profile_consistency',
      description: 'Get profile consistency audit across all platforms (bio, headshot, URL)',
      inputSchema: { type: 'object', properties: {}, required: [] }
    },
    {
      name: 'get_search_presence',
      description: 'Get brand search presence summary and open items',
      inputSchema: { type: 'object', properties: {}, required: [] }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;
  const stateFile = readVaultFile('state.md');
  if (!stateFile) return { content: [{ type: 'text', text: `Brand vault not found at ${VAULT_ROOT}. Run: VAULT_MODE=demo npx -y @aireadylife/brand-plugin` }], isError: true };
  switch (name) {
    case 'get_brand_brief': return { content: [{ type: 'text', text: stateFile }] };
    case 'get_analytics_summary': {
      const section = extractSection(stateFile, '## Analytics');
      return { content: [{ type: 'text', text: section || 'No analytics section found.' }] };
    }
    case 'get_mention_summary': {
      const section = extractSection(stateFile, '## Mentions');
      return { content: [{ type: 'text', text: section || 'No mentions section found.' }] };
    }
    case 'get_profile_consistency': {
      const section = extractSection(stateFile, '## Profile Consistency');
      return { content: [{ type: 'text', text: section || 'No profile consistency section found.' }] };
    }
    case 'get_search_presence': {
      const section = extractSection(stateFile, '## Open Items');
      return { content: [{ type: 'text', text: section || 'No search presence section found.' }] };
    }
    default: return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
