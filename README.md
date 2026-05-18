# GTM Agent OS

An autonomous outbound pipeline engine built on Claude Code.
Give it an ICP. It finds companies, enriches contacts, scores 
leads, and drafts personalised outreach — all from one command.

Built by [Aakash Sethi](https://linkedin.com/in/aakash-sethi) 
— GTM operator and growth engineer.

---

## The problem this solves

Most outbound is manual, inconsistent, and doesn't compound.
You research leads in one tab, write emails in another, log 
results nowhere, and start from scratch next week.

This OS makes outbound a system — not a task.

---

## How it works
Every session reads your config files before doing anything.
Every output gets stored. Every decision gets logged.
The system compounds. You stop repeating yourself.

---

## Architecture
---

## Skill loadout (9 skills, deliberately lean)

### GTM core
| Skill | What it does |
|-------|-------------|
| `positioning-icp` | Interviews client → produces Clay-ready ICP |
| `lead-enrichment` | Designs waterfall enrichment, protects credits |
| `gtm-metrics` | Weekly pipeline report before it shows in revenue |
| `social-selling` | LinkedIn signals → outreach moments |
| `n8n-clay-integration` | Bridges n8n orchestration with Clay enrichment |

### Clay integration
| Skill | What it does |
|-------|-------------|
| `clay-outbound-prep` | Enrich + email + score + first line in one shot |
| `clay-icp-score` | A/B/C/D tier scoring — only enriches qualified leads |
| `clay-reply-classify` | Sorts replies into 4 buckets, recommends next action |

### Outreach
| Skill | What it does |
|-------|-------------|
| `ai-cold-outreach` | 4-email sequences, Tier A/B/C, SOUL.md voice |

---

## Safety layer

4 hooks run automatically on every Claude Code action:

- `block-dangerous-commands` — stops destructive bash commands
- `protect-secrets` — Claude cannot read .env or API keys
- `auto-stage` — every file edit staged to git automatically  
- `notify-permission` — logs every blocked action with timestamp

`send_email` and `post_social` are permanently denied in 
`settings.json`. The agent drafts. You approve. Nothing fires.

---

## How to use this with a client

**What you need from them:**
- Clay webhook URL (5 minutes to set up)
- Email sending tool — Instantly or Smartlead API key
- CRM API key — HubSpot or Salesforce (optional)

**What you do:**
1. Update `BRAND.md` with their product and ICP
2. Add their credentials to `.env`
3. Add webhook URLs to `settings.json`
4. Run `claude` in terminal
5. Type: `Run positioning-icp skill and build the first 
   50-company target list`

Pipeline goes from zero to enriched leads in one session.

---

## What's already working (no credentials needed)

- ICP analysis and refinement
- Lead scoring against any ICP criteria  
- Personalised email drafting in defined voice
- Reply classification and routing logic
- Weekly GTM metrics reporting
- Session memory — never starts blank
- Full Git history of every campaign decision

---

## Integrations (credential-ready, not yet connected)

| Tool | Status | What it unlocks |
|------|--------|----------------|
| Clay | Ready to connect | Lead enrichment, email finding, ICP scoring |
| Instantly | Ready to connect | Email sequence sending |
| Smartlead | Ready to connect | Alternative email sending |
| HubSpot | Ready to connect | CRM sync, deal creation |
| Salesforce | Ready to connect | Enterprise CRM sync |
| n8n | Architecture designed | Workflow orchestration layer |

---

## Why n8n + Claude Code (not just Claude Code)

Most GTM Agent OS builds use Claude Code alone.
This one bridges Claude Code with n8n — giving you:

- Scheduled runs (pipeline builds while you sleep)
- Retry logic and error handling
- High-volume operations without session token limits
- Bidirectional Clay ↔ n8n data sync

The `n8n-clay-integration` skill documents the exact 
webhook patterns and workflow architecture for this bridge.

---

## Built with

- Claude Code (Anthropic) — agentic execution layer
- Claude Sonnet 4.5 — model running the OS
- Clay — lead enrichment and ICP scoring
- n8n — workflow orchestration (architecture ready)
- Instantly — email sequencing (ready to connect)
- Git — append-only campaign history

---

## About the builder

Aakash Sethi — GTM operator with experience scaling 
outbound pipelines from $35M to $50M+ monthly opportunities.

Previously: Growth Marketing at MPOWER Financing, 
Strategy Consulting at Ivy Entrepreneurs.

Background in n8n workflow automation, Clay enrichment 
pipelines, Salesforce/HubSpot operations, and SQL/Python 
data analysis.

This OS is the system I wish I had when building pipelines 
manually. Now it's infrastructure anyone can run.

[LinkedIn](https://linkedin.com/in/aakash-sethi) · 
[Email](mailto:sethiaakash04@gmail.com)