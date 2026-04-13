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
  ? join(__dirname, '../../vault-demo/health')
  : (process.env.HEALTH_VAULT_PATH || join(process.env.HOME, '.ai/vault/health-vault'));

function readVaultFile(path) {
  const fullPath = join(VAULT_ROOT, path);
  if (!existsSync(fullPath)) return null;
  return readFileSync(fullPath, 'utf-8');
}

const server = new Server(
  {
    name: 'aireadylife-health',
    version: '1.0.0',
  },
  {
    capabilities: { tools: {} },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'get_health_brief',
      description: 'Get current health status brief including wellness score, recent labs, medications, and upcoming appointments',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_wellness_score',
      description: 'Get current wellness score from wearable data (sleep, HRV, activity)',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_lab_summary',
      description: 'Get most recent lab results with any flagged values',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_medication_status',
      description: 'Get active medications, dosages, and upcoming refill dates',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_insurance_status',
      description: 'Get insurance coverage details, deductible progress, and HSA balance',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_preventive_care_gaps',
      description: 'Get list of recommended preventive care items and their due dates',
      inputSchema: { type: 'object', properties: {} },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;

  const stateFile = readVaultFile('state.md');
  if (!stateFile) {
    return {
      content: [{ type: 'text', text: `Health vault not found at ${VAULT_ROOT}. Run in demo mode first: VAULT_MODE=demo npx -y @aireadylife/health-plugin` }],
      isError: true,
    };
  }

  switch (name) {
    case 'get_health_brief':
      return { content: [{ type: 'text', text: stateFile }] };

    case 'get_wellness_score': {
      const section = readVaultFile('wellness/current.md') || extractSection(stateFile, '## Wellness');
      return { content: [{ type: 'text', text: section || 'No wellness data found.' }] };
    }

    case 'get_lab_summary': {
      const labs = readVaultFile('labs/latest.md') || extractSection(stateFile, '## Labs');
      return { content: [{ type: 'text', text: labs || 'No lab data found.' }] };
    }

    case 'get_medication_status': {
      const meds = readVaultFile('medications/active.md') || extractSection(stateFile, '## Medications');
      return { content: [{ type: 'text', text: meds || 'No medication data found.' }] };
    }

    case 'get_insurance_status': {
      const insurance = readVaultFile('insurance/current.md') || extractSection(stateFile, '## Insurance');
      return { content: [{ type: 'text', text: insurance || 'No insurance data found.' }] };
    }

    case 'get_preventive_care_gaps': {
      const care = readVaultFile('preventive/gaps.md') || extractSection(stateFile, '## Preventive Care');
      return { content: [{ type: 'text', text: care || 'No preventive care data found.' }] };
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
