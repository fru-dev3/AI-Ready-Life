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
  ? join(__dirname, '../../vault-demo/records')
  : (process.env.RECORDS_VAULT_PATH || join(process.env.HOME, '.ai/vault/records-vault'));

function readVaultFile(path) {
  const fullPath = join(VAULT_ROOT, path);
  if (!existsSync(fullPath)) return null;
  return readFileSync(fullPath, 'utf-8');
}

const server = new Server(
  {
    name: 'aireadylife-records',
    version: '1.0.0',
  },
  {
    capabilities: { tools: {} },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'get_records_brief',
      description: 'Get current records brief including document inventory status, expiring IDs, and subscription summary',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_document_inventory',
      description: 'Get complete document inventory with expiration dates and storage locations',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_expiring_documents',
      description: 'Get all documents expiring within 90 days with renewal instructions',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_subscription_tracker',
      description: 'Get all active subscriptions with monthly cost, renewal dates, and cancellation candidates',
      inputSchema: { type: 'object', properties: {} },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;

  const stateFile = readVaultFile('state.md');
  if (!stateFile) {
    return {
      content: [{ type: 'text', text: `Records vault not found at ${VAULT_ROOT}. Run in demo mode first: VAULT_MODE=demo npx -y @aireadylife/records-plugin` }],
      isError: true,
    };
  }

  switch (name) {
    case 'get_records_brief':
      return { content: [{ type: 'text', text: stateFile }] };

    case 'get_document_inventory': {
      const section = extractSection(stateFile, '## ID & Document Inventory');
      return { content: [{ type: 'text', text: section || 'No document inventory found.' }] };
    }

    case 'get_expiring_documents': {
      const ids = extractSection(stateFile, '## ID & Document Inventory');
      const legal = extractSection(stateFile, '## Legal Documents');
      const combined = [ids, legal].filter(Boolean).join('\n\n');
      return { content: [{ type: 'text', text: combined || 'No document data found.' }] };
    }

    case 'get_subscription_tracker': {
      const section = extractSection(stateFile, '## Subscriptions');
      return { content: [{ type: 'text', text: section || 'No subscription data found.' }] };
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
