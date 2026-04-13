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
  ? join(__dirname, '../../vault-demo')
  : (process.env.LIFE_VAULT_PATH || join(process.env.HOME, '.ai/vault'));

const DOMAINS = [
  'health', 'wealth', 'tax', 'career', 'benefits', 'brand',
  'business', 'ben', 'calendar', 'content', 'estate', 'explore',
  'home', 'insurance', 'intel', 'learning', 'real-estate',
  'records', 'social', 'vision',
];

function readVaultFile(path) {
  const fullPath = join(VAULT_ROOT, path);
  if (!existsSync(fullPath)) return null;
  return readFileSync(fullPath, 'utf-8');
}

function getDomainState(domain) {
  return readVaultFile(`${domain}/state.md`);
}

const server = new Server(
  { name: 'aireadylife-complete', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'get_life_brief',
      description: 'Get a full life briefing — top actions, cross-domain flags, and status across all 20 domains',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_domain_state',
      description: 'Get the current state for a specific life domain',
      inputSchema: {
        type: 'object',
        properties: {
          domain: {
            type: 'string',
            enum: DOMAINS,
            description: 'The life domain to retrieve state for',
          },
        },
        required: ['domain'],
      },
    },
    {
      name: 'get_profile',
      description: 'Get the personal profile used across all domain agents',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'list_domains',
      description: 'List all available life domains and their vault status',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_health_brief',
      description: 'Get health domain status — wellness, labs, medications, insurance',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_wealth_brief',
      description: 'Get wealth domain status — net worth, investments, cash flow',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_tax_brief',
      description: 'Get tax domain status — deadlines, estimates, deductions',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_career_brief',
      description: 'Get career domain status — comp benchmarks, job market, skills gaps',
      inputSchema: { type: 'object', properties: {} },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'get_life_brief': {
      const profile = readVaultFile('profile.md');
      const states = DOMAINS.map(d => {
        const state = getDomainState(d);
        return state ? `## ${d.toUpperCase()}\n\n${state}` : `## ${d.toUpperCase()}\n\n_No vault data found._`;
      });
      const brief = [
        profile ? `# Profile\n\n${profile}` : '',
        '---',
        ...states,
      ].filter(Boolean).join('\n\n');
      return { content: [{ type: 'text', text: brief }] };
    }

    case 'get_domain_state': {
      const domain = args?.domain;
      if (!DOMAINS.includes(domain)) {
        return {
          content: [{ type: 'text', text: `Unknown domain: ${domain}. Valid domains: ${DOMAINS.join(', ')}` }],
          isError: true,
        };
      }
      const state = getDomainState(domain);
      if (!state) {
        return {
          content: [{ type: 'text', text: `No vault data found for domain: ${domain} at ${join(VAULT_ROOT, domain, 'state.md')}` }],
          isError: true,
        };
      }
      return { content: [{ type: 'text', text: state }] };
    }

    case 'get_profile': {
      const profile = readVaultFile('profile.md');
      if (!profile) {
        return {
          content: [{ type: 'text', text: `Profile not found at ${join(VAULT_ROOT, 'profile.md')}. Run in demo mode: VAULT_MODE=demo` }],
          isError: true,
        };
      }
      return { content: [{ type: 'text', text: profile }] };
    }

    case 'list_domains': {
      const status = DOMAINS.map(d => {
        const exists = existsSync(join(VAULT_ROOT, d, 'state.md'));
        return `- **${d}**: ${exists ? 'vault ready' : 'no vault data'}`;
      });
      return { content: [{ type: 'text', text: `# Domain Vault Status\n\nVault root: ${VAULT_ROOT}\n\n${status.join('\n')}` }] };
    }

    case 'get_health_brief':
    case 'get_wealth_brief':
    case 'get_tax_brief':
    case 'get_career_brief': {
      const domain = name.replace('get_', '').replace('_brief', '');
      const state = getDomainState(domain);
      if (!state) {
        return {
          content: [{ type: 'text', text: `No vault data for ${domain}. Run in demo mode: VAULT_MODE=demo` }],
          isError: true,
        };
      }
      return { content: [{ type: 'text', text: state }] };
    }

    default:
      return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
