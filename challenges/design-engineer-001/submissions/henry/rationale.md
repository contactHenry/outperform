# Rationale

## Core Direction

I redesigned the page to feel more premium and intentional while staying inside Signalflow's brand system. The visual strategy is white-first, data-forward, and conversion-focused for VP Sales and RevOps buyers.

## What Changed

1. Rebuilt the hero into a high-contrast narrative with a live-style signal board instead of a generic marketing block.
2. Structured the page around decision-making flow: product proof -> platform depth -> outcomes -> rollout path -> final CTA.
3. Added distinct visual moments (score model bars, signal feed, result counters) so the page feels authored, not templated.
4. Introduced subtle motion system (scroll reveals, counters, chart growth, mobile nav interactions) to increase perceived polish and clarity.

## Why It Should Convert Better

1. It shows the product logic early, not just feature claims, reducing buyer skepticism.
2. It front-loads measurable outcomes in multiple places, reinforcing credibility for enterprise decision-makers.
3. Information density is controlled with modular cards and spacing, making the page easier to scan in <2 minutes.
4. CTA messaging is benefit-led and repeated at natural decision points, improving trial intent.

## Brand and Design System Application

1. Used the provided token palette directly: navy for authority, blue for actions, amber only for highlights.
2. Kept typography in Inter and maintained brand spacing multiples and component radii.
3. Avoided prohibited patterns: no gradient backgrounds, no low-contrast light-on-light text, no visual noise.

## Implementation Notes

1. Architecture is now split cleanly into `index.html`, `styles.css`, and `main.js`.
2. JavaScript is framework-free and scoped to UX enhancements (reveal observer, animated counters, chart/score animations, mobile nav, smooth scrolling).
3. Layout and interactions are responsive from mobile through desktop, with reduced-motion support included.
