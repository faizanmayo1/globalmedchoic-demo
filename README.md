# Global MedChoices — AI Care Intelligence Platform

A pre-sales demo for **Collin J. Childress** (Chairman/President/CEO, Global MedChoices, LLC; Managing Director, The Facíl Firm). Global MedChoices operates at the convergence of **Advanced Healthcare IT + Specialty Surgery + Medical Tourism**, with a mission to **cut healthcare cost ~40%** and **improve access, quality and safety by ~20% each**.

This demo shows the AI platform GMC itself would run: a medical-tourism **care journey** with a **fintech spine** — matching patients to accredited global providers, comparing US-vs-global all-in cost, and orchestrating financing, milestone escrow and the full journey. The AI layer is named **Atlas**.

## Hero story — Case GMC-4471

A 58-year-old Memphis patient needs a **total knee replacement** (specialty orthopaedics). US all-in quote **$48,000**. Atlas matches an accredited (JCI) Bangkok provider at **$27,800 all-in** (incl. flights + 8-night recovery) — **~42% savings** with equal-or-better outcomes. The case is threaded across every screen.

## Screens

| Screen | Section | Status |
| --- | --- | --- |
| Command Center | Overview | ✅ built — map-forward hero, 40% mission KPIs, network map, outcomes index, savings, active cases |
| Global Care Match | Cases · Atlas | ✅ built — **signature** intake → Atlas generate → ranked matches + cost comparison + Care Passport |
| Care Passport | Cases · Atlas | ✅ built — clinical profile w/ provenance, Atlas eligibility, document vault, escrow timeline |
| Provider Intelligence | Network · Atlas | ✅ built — provider scorecards, Atlas quality/outcomes/safety scoring, methodology |
| Care Journey | Network | ✅ built — orchestrated consult→recovery timeline, concierge logistics, smart automation |
| Financing & Payments | Financial · Fintech | ✅ built — payment rail, care-loan options, USD→THB FX, itemized cost, milestone escrow |
| Fraud & Risk Engine | Financial · Atlas | ✅ built — risk signals + scores, distribution, detection factors, escrow gating |
| Atlas Copilot | Atlas | ✅ built — chat w/ reasoning + citations, decision-audit trail, defensible-AI |
| Data & Intelligence | Platform | ✅ built — pipeline flow, 4-layer stack, reusable decision services, "no-rebuild" principles |

> All 9 screens built. `ComingSoon` placeholder retained for any future routes.

## Design language

Premium **concierge**: warm ivory canvas, editorial **Fraunces** serif headlines + **Inter** UI, deep clinical **teal** (structure/trust) and champagne **gold** (premium accent), with an aurora **iris** reserved strictly for Atlas (AI) output. Signature motifs: an abstract world-map with **great-circle route arcs**, a persistent six-stage **Care Journey** spine, and a boarding-pass **Care Passport** artifact. See `DESIGN.md`.

## Stack

React 19 · Vite · TypeScript · Tailwind 3.4 · React Router 7 · recharts · lucide-react. No framer-motion (Tailwind keyframes only).

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
```

Deep-link the signature generated state: `http://localhost:5173/match?auto=1`.

## Data

Illustrative demo data (`src/data/`), real anchors (JCI accreditation, classic medical-tourism corridors, plausible price gaps). Hero case figures are kept consistent across screens from a single source of truth.
