# iCodeee UI / UX audit

## Direction

Use the supplied image as a visual reference: ice blue (#e8f2f9), deep navy (#071d35), crimson (#be123c), oversized typography and a subtle drafting grid. Retain the existing logo and project data.

## Findings and fixes

| Area | Finding | Implemented change |
| --- | --- | --- |
| Header | Contrast relied on changing backgrounds; no active-route indication. Mobile CTA disappeared. | Consistent translucent surfaces, current-route underline, persistent mobile contact CTA. |
| Mobile navigation | No Escape handling, focus containment or scroll lock. | Focus enters the menu, wraps within it, returns to the trigger, and closes with Escape or navigation. Background content becomes inert. |
| Hero | Small overlapping project cards and competing visual effects weakened hierarchy. | Three-line headline, clear CTA and custom dimensional studio artwork with scroll-linked opposing layers. |
| Palette | Electric blue, beige, charcoal and white competed with the requested palette. | Shared ice/navy/crimson tokens and consistent public-page treatments. |
| Scrolling | Repeated layouts and one-time reveals lacked a connected narrative. | Alternating horizontal/vertical reveals that replay, scroll-linked capability strip, sticky process sequence and a full-width crimson statement scene. |
| Sticky behavior | Body overflow-x:hidden created a scrolling ancestor that broke sticky positioning. | Use overflow-x:clip. Confirmed the process introduction stays visible while steps advance. |
| Portfolio | Four third-party iframes loaded complete external applications, including cookie controls and nested navigation. | Zero homepage iframes. Lightweight editorial project covers, CMS-image support, explicit project links and live-site links. Existing apparel imagery remains. |
| Content | Fallback descriptions exposed CMS instructions and unpublished case-study sections. | Public-facing project summaries; only render case-study sections with content; no invented metrics or testimonials. |
| Services / contact | Form choices did not match the advertised capabilities. | Add ecommerce, UI/UX, content strategy and graphic design options. Preserve required fields and submission behavior. |
| FAQ | Disclosure interaction needed a more deliberate hierarchy. | Numbered native details/summary controls, one open answer at a time, animated plus state and keyboard support. |
| Closing section | Large empty area lacked a complementary interaction. | Reference-inspired headline, primary CTA and oversized interactive arrow. |
| Footer | Generic LinkedIn homepage link and limited visual identity. | Remove the unverified social destination; add oversized wordmark, clear email/navigation and back-to-top link. |
| Motion accessibility | Existing magnetic link ignored reduced-motion settings. | Homepage motion toggle, reduced-motion support, reduced magnetic motion and reduced menu transition. Native scrolling remains intact. |

## Verification

- Production build and TypeScript checks pass.
- Browser review of desktop hero, intro, capabilities, portfolio, sticky process, statement, FAQ, closing CTA and footer.
- Mobile review at 390 × 844 and 320 × 740; tablet review at 768 × 1024. Hero, portfolio, navigation, contact layout and required form fields checked; no horizontal document overflow observed.
- FAQ exclusivity confirmed (one open details element).
- Motion toggle confirmed; mobile Escape closes the menu and restores trigger focus.
- Homepage has one main landmark and zero iframes.
- Contact navigation resolves correctly. No test lead was submitted to the live backend.
- All nine public routes checked return HTTP 200 and contain a main landmark: home, work, both project details, services, process, about, resources and contact.
- Final mobile menu accessibility tree contains the menu while background page content is inert. Services navigation works from the menu.
- ESLint configuration added. Lint execution is blocked by the existing dependency combination: TypeScript 7.0.2 is unsupported by the installed typescript-eslint parser. No compiler downgrade was made.

## Scope notes

The homepage is fully redesigned. Shared header/footer, public-route typography, colors, contact choices, resource empty state and project fallback presentation are improved. Admin functionality and backend behavior are unchanged. Original homepage and global CSS backups are in tmp/ui-audit.

## Client imagery update

Following the request for greater creativity and real website imagery:

- Replaced the hero's abstract cards with linked Slugsera campaign, Rupali villa and House of Walia apparel imagery.
- Replaced editorial project covers with full photographic panels and genuine live website previews for Slugsera and Rupali Construction. Previews load only after clicking the preview control; only one is mounted at a time. Closing it restores the image and removes the iframe.
- Added a staggered photographic gallery featuring client-sourced campaign and interior imagery.
- Updated the Work page to share the same portfolio component, and added imagery galleries to project detail pages.
- Retained CMS-provided covers and galleries when available; known clients have source-backed local fallbacks.
- Source URLs recorded in public/work/SOURCES.md. No generated imagery was created for this update.
- Verified both external websites render in their previews, preview switching/closing, mobile image crops, no broken loaded images, and no horizontal overflow at 390px. Production build and TypeScript checks pass.

The original portfolio finding above records the first audit. The current version uses images by default and optional, explicitly requested live previews. Embedded sites may display their own cookie notices; the persistent Visit website links provide access to their full experience.
