#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const VAULT_MODE = process.env.VAULT_MODE || 'live';
const VAULT_ROOT = VAULT_MODE === 'demo'
  ? join(__dirname, '../../vault-demo/intel')
  : (process.env.INTEL_VAULT_PATH || join(process.env.HOME, '.ai/vault/intel-vault'));

function readVaultFile(path) {
  const fullPath = join(VAULT_ROOT, path);
  if (!existsSync(fullPath)) return null;
  return readFileSync(fullPath, 'utf-8');
}

const server = new Server(
  {
    name: 'aireadylife-intel',
    version: '1.0.0',
  },
  {
    capabilities: { tools: {} },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'get_intel_brief',
      description: 'Get the latest intelligence brief including top stories filtered to the user\'s interest lens',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_morning_news',
      description: 'Get this morning\'s top news stories across AI, tech, finance, and world categories',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_source_health',
      description: 'Get source list health — active sources, inactive sources, and last scan date',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_trending_topics',
      description: 'Get currently trending topics and active story threads being tracked',
      inputSchema: { type: 'object', properties: {} },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;

  const stateFile = readVaultFile('state.md');
  if (!stateFile) {
    return {
      content: [{ type: 'text', text: `Intel vault not found at ${VAULT_ROOT}. Run in demo mode first: VAULT_MODE=demo npx -y @aireadylife/intel-plugin` }],
      isError: true,
    };
  }

  switch (name) {
    case 'get_intel_brief':
      return { content: [{ type: 'text', text: stateFile }] };

    case 'get_morning_news': {
      const section = readVaultFile('briefs/latest.md') || extractSection(stateFile, "## Today's Brief");
      return { content: [{ type: 'text', text: section || 'No morning brief found.' }] };
    }

    case 'get_source_health': {
      const section = extractSection(stateFile, '## Source Health');
      return { content: [{ type: 'text', text: section || 'No source health data found.' }] };
    }

    case 'get_trending_topics': {
      const section = extractSection(stateFile, '## Tracked Threads');
      return { content: [{ type: 'text', text: section || 'No tracked threads found.' }] };
    }

    default:
      return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
  }
});

function extractSection(content, heading) {
  const lines = content.split('\n');
  const start = lines.findIndex(l => l.startsWith(heading));
  if (start === -1) return null;
  const end = lines.findIndex((l, i) => i > start && l.startsWith('## '));
  return lines.slice(start, end === -1 ? undefined : end).join('\n');
}

const transport = new StdioServerTransport();
await server.connect(transport);
