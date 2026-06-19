# Design — Global MedChoices Care Intelligence

**Direction:** premium global **concierge** for healthcare × fintech. Calm, human, trustworthy — not a cold control room. Editorial warmth over dashboard density.

## Palette

| Role | Token | Hex |
| --- | --- | --- |
| Canvas | `canvas` | `#FBF8F3` (warm ivory) |
| Ink | `ink` | `#16241F` |
| **Structure / brand** | `teal` | `#0E5B52` (deep clinical teal) |
| **Premium accent** | `gold` | `#C2A24C` (champagne) |
| **AI — Atlas only** | `ai` | `#7C72D6` (aurora iris) |
| Savings / outcomes | `signal-positive` | `#1E8F5B` |
| Risk | `signal-risk` | `#C0453B` |

**The AI rule:** the aurora iris is reserved strictly for Atlas — matches, reasoning, confidence, generation. It's a dusty, calm violet (deliberately distinct from the punchier violets of past demos) so AI provenance reads instantly and never blurs into the teal/gold brand chrome.

## Type

- **Display:** Fraunces (optical serif) — headlines, hero numerals, the wordmark.
- **UI / body:** Inter.
- **Mono:** IBM Plex Mono — case IDs, figures, coordinates, eyebrows.

## Signature elements

1. **WorldMap** (`components/WorldMap.tsx`) — abstract equirectangular meridian graticule with accredited-provider nodes and animated **great-circle route arcs** from the patient origin; the matched route is drawn in gold.
2. **Care Journey spine** (`components/CareJourneyBand.tsx`) — persistent six-stage band (Consult → Match → Finance → Travel → Surgery → Recovery) with the hero case plotted on it, so every screen reads as one continuous journey.
3. **Care Passport** (`components/CarePassport.tsx`) — a boarding-pass-styled artifact of the Atlas-generated care plan (origin → provider, all-in price, savings, quality). The deliverable the patient carries.

## Atmosphere

Warm ivory canvas with faint teal/gold radial washes, a fine grain film, soft card shadows, optical-serif headlines, gradient CTAs (`cta-teal`, `cta-ai`, `cta-gold`), and staggered reveals. Generous whitespace; metrics in tabular figures.
