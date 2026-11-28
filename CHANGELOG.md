# Changelog

## 0.2.4 - 2026-11-27

- Both skills' Fallback section covers two more failures. With no subagent tool, read at most 3 transcripts (or `max_sessions` if lower), user messages only. If the session lookup fails or returns nothing, say so in one line and continue with repo and memory only.

## 0.2.3 - 2026-11-27

- Replace nuance clauses in both skills with conditions an agent can observe. "You decide" is offered when a wrong answer can be changed in one edit.
- `pepper-me` reads at most `conflict_check.repo_files` plus README and manifests. The default list is now stated in the skill.
- The reflection and round 1 use this session, the repo and memory only. Other-session results join from round 2.
- Brief size comes from heat alone.
- `pepper-me-init` reads only the sources listed in its gather section.

## 0.2.2 - 2026-11-27

- `pepper-me` gets a red-flags table (Thought and Reality) and a standalone approval gate: do not start the task until the brief has `status: approved`.
- `pepper-me-init` points to the same red flags, with `PROJECT.md` approval as the gate.
- Sections after the stop test renumber (tone is now section 9).

## 0.2.1 - 2026-11-27

- Skill descriptions now hold triggers only ("Use when..."), so agents read the skill body instead of a workflow summary.
- Carries the rename of `pepper-init` to `pepper-me-init` (`pepper me init`), which shipped without a release.

## 0.2.0 - 2026-11-27

- Add `pepper-init` (`pepper me init`). Scans the repo, interviews you on the gaps, and writes `PROJECT.md`.
- Re-runs update the file without reopening settled decisions. Open items stay marked.
- `pepper me` now reads `PROJECT.md` first and counts it in conflict checks.

## 0.1.0 - 2026-11-27

Initial release.
