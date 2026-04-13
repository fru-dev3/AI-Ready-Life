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
  ? join(__dirname, '../../vault-demo/vision')
  : (process.env.VISION_VAULT_PATH || join(process.env.HOME, '.ai/vault/vision-vault'));

function readVaultFile(path) {
  const fullPath = join(VAULT_ROOT, path);
  if (!existsSync(fullPath)) return null;
  return readFileSync(fullPath, 'utf-8');
}

const server = new Server(
  {
    name: 'aireadylife-vision',
    version: '1.0.0',
  },
  {
    capabilities: { tools: {} },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'get_vision_brief',
      description: 'Get current vision brief including life scorecard, OKR status, and alignment flags',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_goal_status',
      description: 'Get current quarterly OKRs with on-track vs. at-risk status for each objective',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_quarterly_priorities',
      description: 'Get the top priorities for the current quarter and weekly progress check-in',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_life_scorecard',
      description: 'Get the 13-domain life scorecard with scores, velocity indicators, and domain notes',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_alignment_check',
      description: 'Get the calendar vs. priorities alignment analysis — time allocation actuals vs. targets',
      inputSchema: { type: 'object', properties: {} },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;

  const stateFile = readVaultFile('state.md');
  if (!stateFile) {
    return {
      content: [{ type: 'text', text: `Vision vault not found at ${VAULT_ROOT}. Run in demo mode first: VAULT_MODE=demo npx -y @aireadylife/vision-plugin` }],
      isError: true,
    };
  }

  switch (name) {
    case 'get_vision_brief':
      return { content: [{ type: 'text', text: stateFile }] };

    case 'get_goal_status': {
      const section = extractSection(stateFile, '## Q');
      return { content: [{ type: 'text', text: section || 'No OKR data found.' }] };
    }

    case 'get_quarterly_priorities': {
      const okrs = extractSection(stateFile, '## Q');
      const vision = extractSection(stateFile, '## Life Vision');
      const combined = [vision, okrs].filter(Boolean).join('\n\n');
      return { content: [{ type: 'text', text: combined || 'No quarterly priorities found.' }] };
    }

    case 'get_life_scorecard': {
      const section = extractSection(stateFile, '## Life Scorecard');
      return { content: [{ type: 'text', text: section || 'No life scorecard found.' }] };
    }

    case 'get_alignment_check': {
      const section = extractSection(stateFile, '## Alignment Check');
      return { content: [{ type: 'text', text: section || 'No alignment data found.' }] };
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
