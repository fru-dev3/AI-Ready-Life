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
  ? join(__dirname, '../../vault-demo/learning')
  : (process.env.LEARNING_VAULT_PATH || join(process.env.HOME, '.ai/vault/learning-vault'));

function readVaultFile(path) {
  const fullPath = join(VAULT_ROOT, path);
  if (!existsSync(fullPath)) return null;
  return readFileSync(fullPath, 'utf-8');
}

const server = new Server(
  {
    name: 'aireadylife-learning',
    version: '1.0.0',
  },
  {
    capabilities: { tools: {} },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'get_learning_brief',
      description: 'Get current learning status brief including active courses, current book, certifications, and learning goals',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_active_courses',
      description: 'Get all active courses with current progress percentage, platform, and target finish dates',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_skills_progress',
      description: 'Get skills development progress — certifications, completed courses, and skill areas covered',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_learning_goals',
      description: 'Get quarterly learning goals and current progress toward each goal',
      inputSchema: { type: 'object', properties: {} },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;

  const stateFile = readVaultFile('state.md');
  if (!stateFile) {
    return {
      content: [{ type: 'text', text: `Learning vault not found at ${VAULT_ROOT}. Run in demo mode first: VAULT_MODE=demo npx -y @aireadylife/learning-plugin` }],
      isError: true,
    };
  }

  switch (name) {
    case 'get_learning_brief':
      return { content: [{ type: 'text', text: stateFile }] };

    case 'get_active_courses': {
      const section = extractSection(stateFile, '## Active Courses');
      return { content: [{ type: 'text', text: section || 'No active courses found.' }] };
    }

    case 'get_skills_progress': {
      const section = extractSection(stateFile, '## Certifications');
      return { content: [{ type: 'text', text: section || 'No certifications data found.' }] };
    }

    case 'get_learning_goals': {
      const section = extractSection(stateFile, '## Q');
      return { content: [{ type: 'text', text: section || 'No learning goals found.' }] };
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
