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
  ? join(__dirname, '../../vault-demo/content')
  : (process.env.CONTENT_VAULT_PATH || join(process.env.HOME, '.ai/vault/content-vault'));

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

const server = new Server({ name: 'aireadylife-content', version: '1.0.0' }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    { name: 'get_content_brief', description: 'Get current content status brief including channel analytics, revenue, and publishing schedule', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_channel_analytics', description: 'Get YouTube channel analytics — views, watch time, CTR, and subscriber trends', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_revenue_summary', description: 'Get revenue breakdown across all platforms (AdSense, Gumroad, sponsorships) for the current month', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_publishing_schedule', description: 'Get current publishing schedule status — videos queued, published, and upcoming', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_seo_priorities', description: 'Get top SEO title and thumbnail improvement opportunities', inputSchema: { type: 'object', properties: {} } },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;
  const stateFile = readVaultFile('state.md');
  if (!stateFile) return { content: [{ type: 'text', text: `Content vault not found at ${VAULT_ROOT}. Run: VAULT_MODE=demo npx -y @aireadylife/content-plugin` }], isError: true };
  switch (name) {
    case 'get_content_brief': return { content: [{ type: 'text', text: stateFile }] };
    case 'get_channel_analytics': return { content: [{ type: 'text', text: readVaultFile('youtube/analytics.md') || extractSection(stateFile, '## YouTube Analytics') || 'No channel analytics found.' }] };
    case 'get_revenue_summary': return { content: [{ type: 'text', text: readVaultFile('revenue/current.md') || extractSection(stateFile, '## Revenue') || 'No revenue data found.' }] };
    case 'get_publishing_schedule': return { content: [{ type: 'text', text: readVaultFile('00_current/schedule.md') || extractSection(stateFile, '## Publishing Schedule') || 'No publishing schedule found.' }] };
    case 'get_seo_priorities': return { content: [{ type: 'text', text: readVaultFile('seo/priorities.md') || extractSection(stateFile, '## SEO') || 'No SEO data found.' }] };
    default: return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
