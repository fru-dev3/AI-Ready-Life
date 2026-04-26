# AI Ready Life

20 domain plugins for personal life management — health, wealth, tax, career, and 16 more.

This repo is dual-compatible:

- **Claude Code / Claude Desktop** — installs as a plugin via the marketplace at `.claude-plugin/`. Each domain folder ships a `CLAUDE.md` first-run gate.
- **Codex CLI / other AGENTS.md-aware agents** — `cd` into a domain folder (or this repo root) and the agent picks up `AGENTS.md` automatically. Each domain folder mirrors its `CLAUDE.md` as `AGENTS.md`.

## How it works

Each plugin has two parts:

- **The vault** — your personal data, stored locally at `~/Documents/aireadylife/vault/{domain}/` (Mac) or `%USERPROFILE%\Documents\aireadylife\vault\{domain}\` (Windows). Sold as a template on Gumroad.
- **The plugin** — the domain folder in this repo. Read by your AI agent when you run a skill.

## Working in a single domain

```
cd health/      # or wealth/, tax/, etc.
```

Then run your agent (Claude Code, Codex CLI, or any AGENTS.md-aware agent). The agent reads `AGENTS.md` (or `CLAUDE.md` for Claude) from the current directory and follows the first-run gate.

## Skills

Each domain has a `skills/` directory. Every skill is a folder containing a `SKILL.md` with frontmatter (`name`, `type`, `cadence`, `description`) and step-by-step instructions. Read the per-domain `AGENTS.md` for the full skill index.

## Vault Access notes

- **Claude Desktop on Mac** needs Full Disk Access — see per-domain `CLAUDE.md`.
- **Codex CLI / terminal agents** inherit terminal permissions; no extra setup beyond what the terminal app already has.
- **Windows** — no extra permissions in either case.

## Links

- Website: [aireadyu.dev](https://aireadyu.dev)
- Marketplace + plugin manifests: `.claude-plugin/marketplace.json`, `manifest.json`
- Built by [fru.dev](https://fru.dev)
