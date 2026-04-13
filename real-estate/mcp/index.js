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
  ? join(__dirname, '../../vault-demo/real-estate')
  : (process.env.REALESTATE_VAULT_PATH || join(process.env.HOME, '.ai/vault/realestate-vault'));

function readVaultFile(path) {
  const fullPath = join(VAULT_ROOT, path);
  if (!existsSync(fullPath)) return null;
  return readFileSync(fullPath, 'utf-8');
}

const server = new Server(
  {
    name: 'aireadylife-realestate',
    version: '1.0.0',
  },
  {
    capabilities: { tools: {} },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'get_realestate_brief',
      description: 'Get current real estate brief including market conditions, buy vs. rent verdict, and portfolio strategy status',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_market_analysis',
      description: 'Get market analysis for all target markets including median prices, cap rates, and vacancy rates',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_buy_vs_rent_analysis',
      description: 'Get current buy vs. rent analysis for the primary residence market at current mortgage rates',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_portfolio_strategy',
      description: 'Get portfolio strategy — current doors, goal, acquisition timeline, and next target market',
      inputSchema: { type: 'object', properties: {} },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;

  const stateFile = readVaultFile('state.md');
  if (!stateFile) {
    return {
      content: [{ type: 'text', text: `Real estate vault not found at ${VAULT_ROOT}. Run in demo mode first: VAULT_MODE=demo npx -y @aireadylife/realestate-plugin` }],
      isError: true,
    };
  }

  switch (name) {
    case 'get_realestate_brief':
      return { content: [{ type: 'text', text: stateFile }] };

    case 'get_market_analysis': {
      const section = extractSection(stateFile, '## Austin Market') || extractSection(stateFile, '## Phoenix Market');
      return { content: [{ type: 'text', text: section || 'No market analysis found.' }] };
    }

    case 'get_buy_vs_rent_analysis': {
      const lines = stateFile.split('\n');
      const sections = [];
      ['## Austin Market', '## Phoenix Market'].forEach(h => {
        const s = extractSection(stateFile, h);
        if (s) sections.push(s);
      });
      return { content: [{ type: 'text', text: sections.join('\n\n') || 'No buy vs. rent analysis found.' }] };
    }

    case 'get_portfolio_strategy': {
      const section = extractSection(stateFile, '## Portfolio Strategy');
      return { content: [{ type: 'text', text: section || 'No portfolio strategy found.' }] };
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
