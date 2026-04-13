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
  ? join(__dirname, '../../vault-demo/social')
  : (process.env.SOCIAL_VAULT_PATH || join(process.env.HOME, '.ai/vault/social-vault'));

function readVaultFile(path) {
  const fullPath = join(VAULT_ROOT, path);
  if (!existsSync(fullPath)) return null;
  return readFileSync(fullPath, 'utf-8');
}

const server = new Server(
  {
    name: 'aireadylife-social',
    version: '1.0.0',
  },
  {
    capabilities: { tools: {} },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'get_social_brief',
      description: 'Get current social brief including upcoming birthdays, relationship health, and outreach queue',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_relationship_summary',
      description: 'Get relationship health summary — all contacts with health scores and last-contact dates',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_birthdays_milestones',
      description: 'Get upcoming birthdays and milestones in the next 30 days with suggested actions',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_outreach_queue',
      description: 'Get this week\'s outreach queue — who to reach out to and why',
      inputSchema: { type: 'object', properties: {} },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;

  const stateFile = readVaultFile('state.md');
  if (!stateFile) {
    return {
      content: [{ type: 'text', text: `Social vault not found at ${VAULT_ROOT}. Run in demo mode first: VAULT_MODE=demo npx -y @aireadylife/social-plugin` }],
      isError: true,
    };
  }

  switch (name) {
    case 'get_social_brief':
      return { content: [{ type: 'text', text: stateFile }] };

    case 'get_relationship_summary': {
      const section = extractSection(stateFile, '## Relationship Health');
      return { content: [{ type: 'text', text: section || 'No relationship health data found.' }] };
    }

    case 'get_birthdays_milestones': {
      const section = extractSection(stateFile, '## Upcoming Birthdays');
      return { content: [{ type: 'text', text: section || 'No upcoming birthdays found.' }] };
    }

    case 'get_outreach_queue': {
      const section = extractSection(stateFile, "## This Week's Outreach Queue");
      return { content: [{ type: 'text', text: section || 'No outreach queue found.' }] };
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
