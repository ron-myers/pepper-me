---
name: Pepper
description: A kickoff meeting told as a silver-age comic page: process inks, ben-day dots, keylines, and a misregistered red plate.
colors:
  pulp-ground: "#f1e7c4"
  ink-black: "#17140f"
  muted-ink: "#4d4636"
  bleached-paper: "#fffbee"
  process-cyan: "#3a97d6"
  process-red: "#c92a22"
  process-yellow: "#f8c928"
  focus-blue: "#0b3d91"
  night-ground: "#14121a"
  night-paper-ink: "#f4ecd4"
  night-ink: "#0a0910"
  night-red: "#cf3228"
  code-ground: "#1b1812"
  code-text: "#f6ebc8"
typography:
  display:
    fontFamily: "Londrina Solid, Arial Narrow, sans-serif"
    fontSize: "clamp(2.6rem, 7.2vw, 5.6rem)"
    fontWeight: 900
    lineHeight: 1.02
    letterSpacing: "0.01em"
  headline:
    fontFamily: "Londrina Solid, Arial Narrow, sans-serif"
    fontSize: "clamp(2.1rem, 4.5vw, 3.4rem)"
    fontWeight: 900
    lineHeight: 0.98
    letterSpacing: "0.01em"
  title:
    fontFamily: "Londrina Solid, Arial Narrow, sans-serif"
    fontSize: "clamp(1.7rem, 2.6vw, 2.2rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0.01em"
  body:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.78rem"
    fontWeight: 700
    letterSpacing: "0.06em"
rounded:
  none: "0px"
  sm: "3px"
  bubble: "0.5rem"
  bubble-you: "1.6rem"
  pill: "999px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.25rem"
  lg: "1.75rem"
  xl: "4rem"
components:
  panel:
    backgroundColor: "{colors.bleached-paper}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.none}"
  button-copy:
    backgroundColor: "{colors.process-red}"
    textColor: "#ffffff"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.1rem"
    height: "2.75rem"
  button-copy-done:
    backgroundColor: "{colors.process-cyan}"
    textColor: "{colors.ink-black}"
  caption-box:
    backgroundColor: "{colors.bleached-paper}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.1rem"
  bubble-you:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.bubble-you}"
    padding: "0.85rem 1.1rem"
  bubble-agent:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.bubble}"
    padding: "0.85rem 1.1rem"
  chip:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.pill}"
    padding: "0.4rem 0.9rem"
  chip-recommended:
    backgroundColor: "{colors.process-red}"
    textColor: "#ffffff"
  tab-active:
    backgroundColor: "{colors.process-yellow}"
    textColor: "{colors.ink-black}"
    padding: "0.65rem 1rem"
---

# Design System: Pepper

## Overview

**Creative North Star: "The Kickoff, Inked"**

Pepper's site is a silver-age comic page. Panels are the repeating cards, speech bubbles are the transcript, and caption boxes carry every paragraph of prose. Flat process inks (cyan, red, yellow, black) fill panel fields over a pulp page in light mode and a black-ink flood in dark mode. Depth comes from a black keyline and a red misregistration plate, never from soft shadows.

The page is dense but ordered: a 76rem column, 3px keylines on everything that holds content, and display lettering in a heavy condensed face against a warm book serif for reading. Ben-day dot screens (radial-gradient dots, 9 to 11px pitch) texture the colored fields, so flat color never sits bare.

**Key Characteristics:**
- 3px ink keyline on every panel, caption, bubble, code block, and button.
- Idle panels sit half a dot off register: a red outline plate offset 6px right, 5px down. Hover or focus-within snaps it to 0.
- Prose lives in bleached-paper caption boxes; colored fields hold lettering and bubbles.
- Red marks the recommended answer and the primary action only.
- Corners are square except speech bubbles and chips.

## Colors

A four-ink process palette on a warm pulp ground, inverted to a near-black night ground in dark mode while the inks stay put.

### Primary
- **Process Red** (#c92a22): primary action (copy button), recommended chip, selected size, misregistration plate, hover color on links, heat dots, footer rule, scrollbar. Night mode lifts it to #cf3228.

### Secondary
- **Process Yellow** (#f8c928): splash panel field, yellow-tone panel titles, active tab, hover fill on secondary controls, inline code highlight, selection color, table header.
- **Process Cyan** (#3a97d6): speech field behind the hero bubbles, transcript field, blue-tone panel titles, copied-state of the copy button.

### Neutral
- **Pulp Ground** (#f1e7c4): light page ground.
- **Night Ground** (#14121a): dark page ground (prefers-color-scheme).
- **Ink Black** (#17140f): text, keylines, footer. Night keyline ink is #0a0910.
- **Bleached Paper** (#fffbee): caption boxes, panel bodies, tab panels. Always carries ink-black text in both schemes.
- **Muted Ink** (#4d4636): fine print and notes (night text equivalent #c9c0a6).
- **Focus Blue** (#0b3d91): focus ring in light; yellow (#ffd84a) in dark.
- **Code Ground** (#1b1812) with **Code Text** (#f6ebc8): command and code blocks.

### Named Rules
**The Red Is An Answer Rule.** Red appears only where the visitor is being pointed: the recommended option, the primary action, the heat dots. Never as decoration on a panel field.

**The Fields Stay Fixed Rule.** Bubbles, caption boxes, and panel bodies keep paper-white fills with ink-black text in dark mode too; only the page ground, footer text, and focus ring invert.

## Typography

**Display Font:** Londrina Solid (with Arial Narrow, sans-serif), weights 400 and 900
**Body Font:** Literata (with Georgia, serif)
**Label/Mono Font:** JetBrains Mono (with ui-monospace)

**Character:** Londrina is a hand-lettered comic caps face used at weight 900; Literata is a warm, readable text serif that keeps long captions calm. Mono marks commands, speakers, and code.

### Hierarchy
- **Display** (900, clamp(2.6rem, 7.2vw, 5.6rem), 1.02): hero lettering in the splash, uppercase, max 14ch; key phrase set as an ink-black block with yellow text.
- **Headline** (900, clamp(2.1rem, 4.5vw, 3.4rem), 0.98): section h2, uppercase, max 20ch.
- **Title** (900, clamp(1.7rem, 2.6vw, 2.2rem), 1): panel titles (h3), uppercase.
- **Body** (400, 1.0625rem, 1.6): captions and prose, 65ch measure.
- **Label** (700 to 800, 0.75 to 0.95rem, 0.04 to 0.08em, uppercase mono): speaker names, code bar, copy buttons use the serif at weight 800.

### Named Rules
**The Lettering Rule.** Every heading is uppercase Londrina at 900. Prose never is.

## Layout

One centered column, max 76rem, 1rem side gutters, 4rem top padding per page. Content is a comic page grid: the hero is a 1.75fr / 1fr split from 52rem; card grids are 1 column on mobile, 2 columns (skills) from 40rem, and a 6- or 12-column span grid for steps and reasons. Gaps are 1.75rem between rows and 1.25rem between columns. Grids reserve 6px right and 4 to 6px top padding so the misregistration plate is never clipped. Narration captions step in left margins (0, 3vw, 8vw) like staggered panels. Docs prose caps at 52rem container and 65ch measure. Tap targets are at least 2.75rem.

## Elevation & Depth

No blur shadows. Depth is a keyline plus a misregistered second plate: a 3px red outline pseudo-element inset -3px, offset translate(6px, 5px) behind the panel, splash, speech field, and sheet card. It registers (translate 0) on hover and focus-within over 0.18s with cubic-bezier(0.22, 1, 0.36, 1). Buttons lift 2px on hover and drop 1px on press. Transcript beats arrive with an 8px, 6px slide and fade (0.26s, same easing) one at a time; reduced-motion shows them immediately.

### Named Rules
**The Half-Dot Rule.** Idle is off register; attention registers the plate. Do not add soft shadows or hard offset shadows in ink.

## Shapes

Square keylined rectangles (3px ink border) for panels, captions, code, tabs, and buttons. Speech bubbles are the exception: the "you" bubble is a 1.6rem rounded oval with a skewed tail at bottom right; the agent bubble is 0.5rem. Chips are full pills with a 2px border. Heat is three 0.8rem circles, filled red for the level. The logo mark is a red dot with an ink ring. Panels tab: a small ink label sits straddling the top-left edge.

## Components

### Panel
Paper-white keylined card, anatomy: tab label, uppercase title band, one-line summary, arrow action link. Title band takes a tone (paper, yellow, cyan, red with white text) and a ben-day dot screen. Registers its red plate on hover.

### Buttons
- **Copy:** process red, white 800-weight text, 3px ink border, 2.75rem min height; copied state turns cyan with ink text.
- **Replay and size selector:** paper or white fill, ink border; hover yellow; selected size is red with white text.

### Caption Box
Paper-white, 3px ink keyline, 1.0625rem Literata, max 62ch. The hot variant swaps the border to red.

### Speech Bubbles
White fill, 3px keyline, skewed corner tail. Used in the hero speech field and transcript beats; speaker label above in mono caps.

### Code Block
Dark code ground, 3px keyline, mono bar with copy button, scrollable pre.

### Tabs
Paper tabs with ink border and no bottom edge; active and hover are yellow; the panel under them is paper with a 3px keyline.

### Navigation
Mark at left (Londrina 2.1rem caps with red dot), links in 600-weight serif at 0.95rem, underline hover turning red (yellow in dark). Footer is an ink block with a 6px red top rule.

## Do's and Don'ts

### Do:
- **Do** wrap content in a 3px ink keyline and put prose in bleached-paper caption boxes.
- **Do** texture every colored field with a ben-day dot screen (9 to 11px pitch, 0.2 to 0.28 alpha).
- **Do** keep idle panels off register by (6px, 5px) in red and snap them on hover and focus.
- **Do** reserve red for the recommended answer, the primary action, and heat dots.
- **Do** keep a 3px focus ring (#0b3d91, yellow in dark) with 3px offset.

### Don't:
- **Don't** use blur shadows or hard offset ink shadows; depth is keyline plus misregistration.
- **Don't** set prose directly on a colored field; use a caption box or bubble.
- **Don't** fill panels with flat unscreened color or introduce a fifth ink.
- **Don't** put the page in a centered-hero-over-feature-cards SaaS layout.
