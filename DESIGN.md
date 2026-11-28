---
name: Pepper Me
description: Two voices on one page. The user shouts in giant condensed type; the agent answers small, in monospace. Black ink, white stock, one hot red, hairline rules.
colors:
  paper: "#fafaf7"
  ink: "#0b0b0b"
  muted-ink: "#55524b"
  hairline: "#cfcdc4"
  cell: "#f1f0ea"
  hot-red: "#c93418"
  on-hot-red: "#ffffff"
  focus-blue: "#0b3d91"
  night-paper: "#0b0b0c"
  night-ink: "#f2f0e8"
  night-muted-ink: "#a9a69c"
  night-hairline: "#2e2e31"
  night-cell: "#131315"
  night-hot-red: "#ff6a45"
  night-on-hot-red: "#0b0b0c"
  night-focus-yellow: "#ffd84a"
  code-ground: "#0b0b0b"
  code-text: "#f2f0e8"
typography:
  display:
    fontFamily: "Anton, Arial Narrow, sans-serif"
    fontSize: "clamp(3.6rem, 12.5vw, 10.5rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "Anton, Arial Narrow, sans-serif"
    fontSize: "clamp(2.6rem, 6.5vw, 5rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.005em"
  title:
    fontFamily: "Anton, Arial Narrow, sans-serif"
    fontSize: "clamp(1.9rem, 2.8vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.005em"
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.85rem"
    fontWeight: 600
    lineHeight: 1.2
rounded:
  none: "0px"
  dot: "50%"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.25rem"
  lg: "2.5rem"
  xl: "6rem"
components:
  button-copy:
    backgroundColor: "{colors.hot-red}"
    textColor: "{colors.on-hot-red}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.1rem"
    height: "2.75rem"
    typography: "{typography.label}"
  button-copy-done:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-replay:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.6rem 1.1rem"
    height: "2.75rem"
  button-replay-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.25rem 1.25rem 1.4rem"
  panel-hover:
    backgroundColor: "{colors.cell}"
  chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.45rem 0.9rem"
    typography: "{typography.label}"
  chip-recommended:
    backgroundColor: "{colors.hot-red}"
    textColor: "{colors.on-hot-red}"
  code-block:
    backgroundColor: "{colors.code-ground}"
    textColor: "{colors.code-text}"
    rounded: "{rounded.none}"
    padding: "1rem 1.15rem"
  size-toggle-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    height: "2.75rem"
  sheet-card:
    backgroundColor: "{colors.cell}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.5rem 1.4rem"
---

# Design System: Pepper Me

## Overview

**Creative North Star: "Two Voices"**

The page is a conversation with two speakers and size is volume. The user's voice is Anton, uppercase, enormous, and tightly leaded; it is the headline of every section and the large lines of the transcript. The agent's voice is JetBrains Mono at body size, quiet and exact: replies, labels, commands, code. Pepper Me's whole product claim (a vague ticket versus a proper kickoff) is told by this contrast before any copy is read.

The material is black ink on white stock with hairline rules. There are no shadows, no gradients, no rounded corners, no filled decoration. Structure comes from 1px ink rules that form ruled cells, and from scale. One hot red-orange is rationed to the recommended answer, the primary action, the heat dots, and the agent's second-sentence echo in the hero. Dark mode inverts to off-white ink on near-black and lifts the red so it keeps contrast.

Density is editorial and generous: 80rem container, 6rem between sections, long measure capped at 65ch for prose and 48ch inside cells.

**Key Characteristics:**
- Anton uppercase for the user's voice; Hanken Grotesk for prose; JetBrains Mono for the agent, labels and code.
- Hairline ink rules and ruled grid cells instead of shadows or boxes.
- One red, used on the single most important thing in a region.
- Square corners everywhere; the only circles are dots (logo mark, heat meter).
- Light and dark are both first-class and follow the system.

## Colors

A near-monochrome ink-and-paper palette with a single hot red. Neutrals are slightly warm, never pure white or pure black.

### Primary
- **Hot Red** (#c93418): the recommended chip, the copy button, step numerals, the agent label and agent-voice speaker tag, the second hero sentence, heat dots, the logo dot, text selection, link hover. In dark mode it becomes **Night Hot Red** (#ff6a45) with dark text on it (#0b0b0c).

### Neutral
- **Paper** (#fafaf7): page ground and default cell fill. Dark: **Night Paper** (#0b0b0c).
- **Ink** (#0b0b0b): text, strong rules (the grid, code frames, footer top rule), selected-state fills. Dark: **Night Ink** (#f2f0e8).
- **Muted Ink** (#55524b): secondary labels, notes, the user/agent speaker tag. Dark: #a9a69c.
- **Hairline** (#cfcdc4): soft dividers (header bottom, table row lines, inline-code borders). Dark: #2e2e31.
- **Cell** (#f1f0ea): hover fill for panels, the brief sheet card, inline-code ground, table header ground. Dark: #131315.
- **Code Ground** (#0b0b0b) with **Code Text** (#f2f0e8): the one filled ink block; in dark mode the ground lifts to #131315.
- **Focus Blue** (#0b3d91): 3px focus ring, offset 3px. Dark: **Focus Yellow** (#ffd84a).

### Named Rules
**The One Red Rule.** Red marks the one thing to act on or notice in a region: the recommended answer, the primary action, the heat. Never use it for decoration, large fills, or more than one filled object per region.

**The Ink Rule.** Strong structure is 1px full-strength ink; soft structure is 1px Hairline. Neither is ever replaced by a shadow or a tint.

## Typography

**Display Font:** Anton (with Arial Narrow, sans-serif), always uppercase, weight 400 only
**Body Font:** Hanken Grotesk (with system-ui, sans-serif)
**Label/Mono Font:** JetBrains Mono (with ui-monospace)

**Character:** A loud condensed poster face against a plain reading grotesque and a technical mono. Anton is the user shouting; mono is the agent speaking quietly; Hanken just lets the prose be read.

### Hierarchy
- **Display** (Anton 400, clamp(3.6rem, 12.5vw, 10.5rem), 0.88): the hero's first sentence only. The second hero sentence drops to clamp(1.9rem, 5vw, 4rem) in Hot Red.
- **Headline** (Anton 400, clamp(2.6rem, 6.5vw, 5rem), 0.95, max 18ch): every section h2. Doc h1 uses clamp(3.4rem, 9vw, 6.5rem).
- **Title** (Anton 400, clamp(1.9rem, 2.8vw, 2.5rem), 1): panel and card h3. The user's transcript lines use clamp(2.2rem, 5.6vw, 4.4rem) at 0.95.
- **Body** (Hanken 400, 1.0625rem, 1.6): prose; lede 1.15rem to 1.2rem; max 65ch. Panel text 1rem at 1.55, max 48ch.
- **Label** (JetBrains Mono 500 to 700, 0.78rem to 0.9rem): nav, links with arrows, buttons, chips, agent replies (0.95rem at 1.55 to 1.6), speaker tags, code (0.875rem at 1.7).

### Named Rules
**The Volume Rule.** Size is the speaker. Anything the user says or the page asserts as a headline is Anton and large; anything the agent says is mono and small. Never set the agent's voice in the display face or the user's in mono.

**The One Weight Rule.** Anton is used at 400 only, uppercase, with balanced wrapping. Do not bold or lowercase it.

## Layout

A single column at max 80rem with 1.25rem side gutters, sections separated by 6rem of top padding (4.5rem under 40rem). The hero stacks two sentences of display type above a two-column foot (1.1fr / 1fr from 56rem) holding the lede and install on the left and the agent reply on the right. Card sections use a gap-less ruled grid: 2 columns for skills from 40rem, a 6-column grid with 3 plus 3 then 2 plus 2 plus 2 spans for steps, and a 12-column grid with 4 across then 3 across from 64rem for the "why" cards. The transcript is an offset conversation: user lines left at full width up to 58rem, agent lines indented clamp(0, 8vw, 7rem) at max 40rem, and flush left under 40rem. Docs pages run at 52rem with a 65ch prose measure. Code and tables scroll horizontally inside their own frames; the page never does. Spacing is rem-based with no formal scale: 0.5 to 1.25rem inside components, 2.5rem to 3.5rem between blocks, 6rem between sections.

## Elevation & Depth

Flat, with no box-shadows anywhere. Depth is conveyed by ruled borders, by the one inverted ink block for code, and by a background step to Cell on hover or focus-within of a panel (0.18s, cubic-bezier(0.22, 1, 0.36, 1)).

### Named Rules
**The No Shadow Rule.** Nothing floats. A surface is either on the paper, ruled into a cell, or inverted to ink.

## Shapes

Square. Every box, button, chip, code block and table has 0 radius and a 1px ink border. The only round forms are dots: the 0.75rem logo dot and the 0.7rem heat dots (filled when on, red outline when off). Grid cells share borders (top and left on the grid, right and bottom on each cell) so adjacent cells show a single rule.

## Components

### Buttons
- **Shape:** square (0), minimum height 2.75rem (2.25rem inside code bars).
- **Copy (primary):** Hot Red fill, white text, 1px red border, mono 700 at 0.85rem, padding 0.75rem 1.1rem. Hover lifts 2px (translateY(-2px), 0.12s); active drops 1px. After copying it inverts to Ink fill with Paper text for 2s and announces "Copied to clipboard" through a polite live region.
- **Replay (secondary):** Paper fill, Ink text, 1px ink border; hover inverts to Ink fill.
- **Size toggle:** a joined segmented radiogroup in one ink frame; the selected segment is Ink fill with Paper text, hover is Cell.
- **Tabs:** underline tabs on a 1px ink baseline; selected tab has Ink text and a 3px Hot Red underline, unselected is Muted Ink.

### Panels (cards)
- **Anatomy:** one for every card on the site: Anton title, one-line summary, optional meta row, optional mono action with a trailing arrow. Padding 1.25rem, ruled cell, Paper fill, hover and focus-within to Cell.
- **Step numerals:** on "steps" panels the lead is a Hot Red Anton numeral (clamp(2.4rem, 4vw, 3.4rem)), which is a real ordinal, not a label.

### Chips
- Square, 1px ink border, mono 600 0.85rem, Paper fill. The recommended chip is Hot Red fill with white text and is the only red filled object in the transcript. Chips are display, not controls (cursor default).

### Code blocks
- The one inverted block: Code Ground with Code Text, 1px ink frame, a bar with a mono uppercase 0.75rem filename and a copy button, then a horizontally scrolling pre (0.875rem, 1.7). The pre is keyboard focusable. Under 40rem the hero and install pre wrap instead of scrolling.

### Navigation
- Header: Anton uppercase wordmark with a Hot Red dot, and mono 500 0.82rem links, underlined on hover; a hairline bottom rule. Wraps on narrow widths. A skip link slides in on focus. The footer opens with a full-weight ink rule and an oversized Anton wordmark (clamp(3rem, 12vw, 8rem)).

### Transcript (signature)
- Beats are revealed one at a time (opacity and 10px rise, 0.3s to 0.35s), staggered 1.5s, triggered when 35% in view; with reduced motion, or no JS, the full transcript is shown and the Replay button is hidden. The user line is huge Anton; the agent reply is small mono under an indented Hot Red speaker tag.

### Brief sheet (signature)
- A two-up: a Cell-filled rendered sheet (Anton title, bold inline terms, Anton h4 section heads) beside a code block of the raw markdown. Empty sections are dimmed to Muted Ink.

### Heat meter
- Three 0.7rem dots with 1.5px Hot Red outline; filled for the level; paired with a mono Muted Ink label.

## Do's and Don'ts

### Do:
- **Do** let scale carry hierarchy: Anton uppercase for assertions, mono for the agent, Hanken for reading.
- **Do** build structure from 1px ink or hairline rules and shared cell borders.
- **Do** keep one Hot Red filled object per region and let it mean "the answer" or "the action".
- **Do** keep 2.75rem minimum hit areas, a 3px offset focus ring (Focus Blue / Focus Yellow), and reduced-motion fallbacks that show everything.
- **Do** keep copy in a plain, short, mono-friendly voice and design for light and dark together.

### Don't:
- **Don't** add shadows, gradients, rounded corners, glass or tinted fills; the world is flat ink on paper.
- **Don't** return to the comic-page language (halftone dots, thick keylines, process colors, panel-title bands) this system replaced.
- **Don't** set the agent in the display face or bold and lowercase Anton.
- **Don't** use red for decoration, large areas, or text on body copy.
- **Don't** use a centred hero over a row of identical feature cards; the hero is the two-sentence stage with the agent reply beside the install.
