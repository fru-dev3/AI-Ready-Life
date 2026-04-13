# AI Ready Life

**4 AI plugins. 4 life domains. Private. On your machine.**

AI Ready Life packages your most important life domains as installable AI agent plugins — each one a self-contained expert with its own skills, vault, and Claude integration. Start with one domain. Add more as needed.

## Plugins

| Plugin | Domain | Agents | Price |
|--------|--------|--------|-------|
| `health` | Personal health, labs, wellness, insurance | 2 | $29 |
| `wealth` | Net worth, investments, cash flow, estate | 2 | $29 |
| `tax` | Tax planning, filing, deadlines, compliance | 2 | $29 |
| `career` | Compensation, market, job search, skills | 2 | $29 |

**Bundle (all 4): $79**

## Install via Paperclip

```bash
# Install one plugin
npx companies.sh add fru-dev3/aireadyu-life/health --include plugin,agents,skills

# Install all plugins
npx companies.sh add fru-dev3/aireadyu-life --all
```

## Install via Claude.ai (MCP)

Each plugin ships with a built-in MCP server for direct Claude.ai integration:

1. Open Claude.ai → Settings → Integrations → Add MCP Server
2. Enter the server URL for your plugin:
   - Health: `npx -y @aireadylife/health-plugin`
   - Wealth: `npx -y @aireadylife/wealth-plugin`
   - Tax: `npx -y @aireadylife/tax-plugin`
   - Career: `npx -y @aireadylife/career-plugin`

## Demo Mode

Each plugin includes a pre-populated demo vault with synthetic data for "Alex Rivera" so you can explore the full system before connecting your real data.

```bash
# Run in demo mode
VAULT_MODE=demo npx -y @aireadylife/health-plugin
```

## Part of AI Ready

- Website: [aireadyu.dev](https://aireadyu.dev)
- YouTube: [youtube.com/@frudev](https://youtube.com/@frudev)
- Built by [fru.dev](https://fru.dev)
