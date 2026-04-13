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
  ? join(__dirname, '../../vault-demo/calendar')
  : (process.env.CALENDAR_VAULT_PATH || join(process.env.HOME, '.ai/vault/calendar-vault'));

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

const server = new Server({ name: 'aireadylife-calendar', version: '1.0.0' }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'get_calendar_brief',
      description: 'Get the full calendar state including deadlines, focus time health, and weekly priorities',
      inputSchema: { type: 'object', properties: {}, required: [] }
    },
    {
      name: 'get_upcoming_events',
      description: 'Get upcoming events and deadlines for the next 30 days across all domains',
      inputSchema: { type: 'object', properties: {}, required: [] }
    },
    {
      name: 'get_deadline_alerts',
      description: 'Get urgent deadlines (within 30 days) flagged by urgency tier',
      inputSchema: { type: 'object', properties: {}, required: [] }
    },
    {
      name: 'get_focus_time_health',
      description: 'Get focus time health: deep work hours this week vs. target and fragmentation score',
      inputSchema: { type: 'object', properties: {}, required: [] }
    },
    {
      name: 'get_quarterly_priorities',
      description: 'Get weekly priorities aligned with quarterly goals',
      inputSchema: { type: 'object', properties: {}, required: [] }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;
  const stateFile = readVaultFile('state.md');
  if (!stateFile) return { content: [{ type: 'text', text: `Calendar vault not found at ${VAULT_ROOT}. Run: VAULT_MODE=demo npx -y @aireadylife/calendar-plugin` }], isError: true };
  switch (name) {
    case 'get_calendar_brief': return { content: [{ type: 'text', text: stateFile }] };
    case 'get_upcoming_events': {
      const section = extractSection(stateFile, '## Upcoming Deadlines');
      return { content: [{ type: 'text', text: section || 'No upcoming events section found.' }] };
    }
    case 'get_deadline_alerts': {
      const section = extractSection(stateFile, '## Upcoming Deadlines');
      return { content: [{ type: 'text', text: section || 'No deadline alerts found.' }] };
    }
    case 'get_focus_time_health': {
      const section = extractSection(stateFile, '## Focus Time Health');
      return { content: [{ type: 'text', text: section || 'No focus time section found.' }] };
    }
    case 'get_quarterly_priorities': {
      const section = extractSection(stateFile, '## Weekly Priorities');
      return { content: [{ type: 'text', text: section || 'No priorities section found.' }] };
    }
    default: return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
