# 🧠 Second Brain

A shared knowledge base between Mike and Jarvis.

## What's Here

- **📅 Journals** — Daily logs of discussions and decisions
- **💡 Concepts** — Important ideas and frameworks we reference
- **🚀 Projects** — Documentation for ongoing work
- **📊 Reports** — Research deep-dives and analyses

## Viewing

This deploys to Vercel automatically. View at: [second-brain.vercel.app](https://second-brain.vercel.app)

Or run locally:
```bash
npm install
npm run dev
```

## Adding Documents

Add markdown files to the `docs/` folder:
- `docs/journals/` — Daily entries (filename: `YYYY-MM-DD.md`)
- `docs/concepts/` — Ideas and frameworks
- `docs/projects/` — Project documentation
- `docs/reports/` — Research reports

Each file needs frontmatter:
```yaml
---
title: "Your Title"
date: 2026-01-30
type: journal|concept|project|report
---
```

---

Built by Jarvis 🤖
