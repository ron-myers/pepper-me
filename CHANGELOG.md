# Changelog

## 0.5.0 - 2026-11-28

- Manifests for Codex (`.codex-plugin/plugin.json`), Cursor (`.cursor-plugin/plugin.json`) and Gemini CLI (`gemini-extension.json`, `GEMINI.md`). GitHub Copilot CLI installs from the existing Claude marketplace file.
- Both skills ship `references/<agent>-tools.md` for Codex, Cursor, Gemini CLI and Copilot. They map question asking, the agent file, other-session lookup and subagents.
- `scripts/bump-version.sh` and `.version-bump.json` keep every manifest on one version.
- Other-session lookup reads Claude Code transcripts, so it is Claude Code only. The tool notes say so.

## 0.4.0 - 2026-11-27

- New setting `after_task.run` (string or `null`, default `null`) in `pepper-me`. When set, the named skill or slash command runs once the task is done and passes the "Done looks like" check. The setting is the consent, so there is no extra confirm, even for `candid-ship`, which publishes. The outcome is reported in one or two lines. A missing skill or command is skipped with a one-line note, with no substitute. If the user stops the task or the check fails, the follow-up is skipped. A mid-task brief bump runs it once, at the end.
- New arguments `after:<name>` and `no-after` override the setting for one run. `after:<name>` works even when the setting is `null`.
- Fixes #21.

## 0.3.0 - 2026-11-27

- New setting `brief.auto_start` (boolean, default `false`) in `pepper-me`. When true, the approve card is skipped: the brief is shown, saved as `status: approved`, and the task starts. Mid-task version bumps skip the card too. A hard conflict still open when the user says "go" is listed in the brief.
- New arguments `auto` and `no-auto` override the setting for one run.
- The red-flags row on approval, in both skills' `references/shared.md`, names `brief.auto_start: true` as the only exception. Fixes #20.

## 0.2.6 - 2026-11-27

- `only_projects` and `skip_projects` now have a stated rule in both skills' `references/shared.md`. Each entry matches if it appears anywhere in the project folder name (substring, case-sensitive). An empty `only_projects` reads all projects. A folder that matches both lists is skipped. An empty string entry is ignored. Fixes #15.

## 0.2.5 - 2026-11-27

- Both skills now ship `references/shared.md` with the shared defaults, tones, session rules, round mechanics and red flags. `pepper-me-init` no longer points to the `pepper-me` skill, so it works when installed alone. Each skill reads the file in section 0. If it can't be read, the skill says so and stops. Fixes #14.

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
