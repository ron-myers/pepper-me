# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Next.js (App Router, TypeScript, static export where possible), Tailwind or CSS modules, MDX for skill pages, `next/font`. Deploy to Vercel. Lives in `site/` in this repo. Analytics: Fathom only, loaded only when `NEXT_PUBLIC_FATHOM_SITE_ID` is set, with custom events on copy, install tabs, brief switcher and link clicks. No other trackers. Install tabs: Claude Code plugin (default), Gemini CLI, GitHub Copilot CLI, Codex, Cursor, Antigravity, Devin CLI, skills.sh, Manual.

## Users
- Developers starting a task with vague intent.
- Teams onboarding an agent to an existing repo.
- Non-developers using agents, such as PMs and founders.
Agents also read the site (`llms.txt`).

## Product Purpose
Pepper Me is a set of agent skills that give an agent context before it works. `pepper-me` runs a kickoff for one task and writes a brief. `pepper-me-init` interviews the user once and writes `PROJECT.md`. The site exists for adoption by other developers. Main action: install the plugin.

## Positioning
Agents get the one-line ticket; Pepper Me gives them the kickoff meeting.

## Operating Context
Source of truth for all copy: `README.md`, `skills/*/SKILL.md`, `CHANGELOG.md`, `.claude-plugin/plugin.json` (version 0.5.0). Install: Claude Code plugin, Gemini CLI, GitHub Copilot CLI, Codex, Cursor, Antigravity, Devin CLI, skills.sh, manual. The install tabs use the README commands exactly.

## Capabilities and Constraints
- Every claim must trace to repo files. No invented features, stats, testimonials, logos or user counts.
- Never edit a `SKILL.md`. Skill wording is the product.
- Heat levels `mild`, `medium`, `hot` exist as a product concept.
- Supported agents: Claude Code, Gemini CLI, GitHub Copilot CLI, Codex, Cursor, Antigravity, Devin CLI. Name them only as the README does. Do not label any untested, beta or experimental. Add an install command only if the README gives one.
- Other-session lookup reads Claude Code transcripts and works only in Claude Code. Say so wherever other sessions are described.

## Brand Commitments
Voice is the README's: short sentences, plain words, a little warmth, no hype. Feel references hardproblems.com (editorial, mission-led, card-based, generous whitespace) in spirit only. Do not copy its layout, wordmark, illustrations, colors or copy.

## Evidence on Hand
README sample transcript and sample `card` brief. No testimonials, logos, user counts or stats exist; do not fabricate.

## Product Principles
- Plainspoken over persuasive.
- Show the real thing: transcripts, briefs and commands are first-class.
- Editorial publication, not SaaS landing page.
- Every claim traceable to the repo.

## Accessibility & Inclusion
Keyboard reachable, visible focus, copy buttons announce success, `prefers-reduced-motion` respected, works from 360px, light and dark.
