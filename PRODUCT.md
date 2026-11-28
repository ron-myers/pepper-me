# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Next.js (App Router, TypeScript, static export where possible), Tailwind or CSS modules, MDX for skill pages, `next/font`. Deploy to Vercel. Lives in `site/` in this repo. No analytics, cookies or trackers.

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
Source of truth for all copy: `README.md`, `skills/*/SKILL.md`, `CHANGELOG.md`, `.claude-plugin/plugin.json` (version 0.2.1). Install: Claude Code plugin, skills.sh, manual.

## Capabilities and Constraints
- Every claim must trace to repo files. No invented features, stats, testimonials, logos or user counts.
- Never edit a `SKILL.md`. Skill wording is the product.
- Heat levels `mild`, `medium`, `hot` exist as a product concept.
- Open: PROJECT.md notes skills.sh support is unconfirmed (target platform Claude Code only). README still lists it; site follows README.

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
