# turphDeck

The **public, portfolio-grade pitch deck for the turph suite** — the one artifact that explains,
in five minutes, what the whole ecosystem *is*.

This repo is deliberately **outside** the turph architecture. The suite is tailnet-only, no-cloud,
plain Vite. This deck is the opposite on purpose: **public, on Vercel**, because it's a
*meta-artifact about the suite, not part of it.* There is no PII in the story — the household is
the *domain* the work proves itself against, never the *subject*. It reuses the suite's locked
visual identity (DM Sans / Newsreader / terracotta) so it reads as on-brand.

## Where the thinking lives

The ideation, the spine, the cut list, and the format decisions are recorded in the turph design
journal — **the canonical record of intent**:

- `turph/docs/design-journal/018-ecosystem-pitch-deck.md`

Read that first. This README only states what's settled; the *why* is in 018.

## What's decided

- **Audience:** portfolio / professional. Takeaway: *thinks in systems, ships to production,
  designed for coherent constraints on purpose.*
- **Opening line:** *"A household runs on a pile of real problems — money, health, insurance, a
  constant flood of information. I am designing and shipping the software to actually handle mine."*
  (Problem-framed; present tense is deliberate — an evolving process, which licenses the
  live-vs-planned mix. The company/CEO metaphor enters right after as the *lens*, not the headline.)
- **Spine (one idea):** one consumption surface over many producer apps, a thin ops layer of
  agents that *sense and assess while the human decides*, keeping it current, focused, self-aware.
  No SaaS, no cloud, no subscription. Tailnet-only, one Mac mini, run from a phone.
- **Money slide:** the cross-app agent ops layer (the nervous system). **Close:** the turphViz
  signal field — the payoff, and the pitch turphViz never had.
- **Cuts:** no per-app deep-dives, no feature tours, no live data. Apps appear once, as proof. A
  "Decisions I refused to make" slide.
- **Current by design:** never a staleness chore — built from a single small content source,
  updated at ship-time, not tended.

## Stack

**Vite + Svelte 5 (runes).** Same toolchain as the suite, so the locked identity tokens drop
straight in — on-brand by construction. Static build (`npm run build` → `dist/`), Vercel
auto-detects Vite. Dev: `npm run dev`.

- `src/lib/content.js` — the single small content source (the "current by design" surface).
  `status: live | building | planned` per item drives the visual live-vs-planned distinction.
- `src/App.svelte` — deck shell (keyboard + dot nav, light/dark).
- `src/lib/slides/` — one component per slide: `Opener`, `Architecture`, `OpsLayer`, `Payoff`.

## Status

**Skeleton built** — opener + the three load-bearing slides (producer/consumer, the agent ops
layer, the turphViz payoff), both light and dark. Not yet committed. No GitHub remote or Vercel
project yet — deliberate later steps. Next: the "Decisions I refused to make" slide, content
fill, then deploy.
