# Velvet Crumb — Custom Cake Studio Website

A premium, single-page website for a boutique custom cake business, built with plain HTML, CSS, and JavaScript. No build step, no framework — open `index.html` and it runs.

**Made for your sweetest moments.**

## Structure

```
velvet-crumb/
├── index.html          The entire site — all 12 sections
├── css/
│   ├── style.css         Design tokens, nav, hero, buttons, reveal/parallax animations
│   └── pages.css         Section layouts (cakes, customizer, story, gallery, order form, footer)
├── js/
│   └── script.js         Nav, smooth scroll, scroll reveal, cake customizer, gallery
│                         filter + lightbox, testimonial carousel, upload zone, form validation
├── assets/images/        (empty — imagery currently loads from Unsplash CDN, see below)
└── README.md
```

## Running it locally

No build tools required. Either:

- Double-click `index.html` to open it directly in a browser, or
- Serve the folder locally for the most accurate experience:
  ```bash
  cd velvet-crumb
  python3 -m http.server 8000
  # then open http://localhost:8000
  ```

## Brand system

| Token | Hex | Use |
|---|---|---|
| Soft Cream | `#FFF8F1` | Primary background |
| Blush Pink | `#E9B8B8` | Accents, floating decoration |
| Deep Cocoa | `#38251F` | Primary typography |
| Rosewood | `#7B4545` | Accents, primary buttons |
| Champagne Gold | `#C9A66B` | Sparingly — dividers, premium details |
| White | `#FFFFFF` | Card backgrounds |

Typography: **Playfair Display** (editorial serif headlines) + **Parisienne** (script accent, used sparingly for the tagline and hero's second line) + **Poppins** (body/UI sans-serif).

Signature visual motif: a hand-piped "icing swirl" divider — a short animated gold squiggle, styled after buttercream piping, that draws itself in under every section heading. It ties directly back to the Velvet Crumb name and craft.

## Images

All photography currently points to Unsplash's CDN (`images.unsplash.com`), using free-to-use, no-attribution-required photos chosen for a warm, boutique, celebration-cake mood. These links are stable but **should be replaced with real photography of your own cakes** before this goes live — every `<img>` tag already has descriptive `alt` text you can keep.

To swap in local images instead: drop files into `assets/images/`, then update the `src` paths (e.g. `assets/images/hero-cake.jpg`).

## Features implemented

- Sticky nav: transparent over the hero → cream/blurred with shadow on scroll; animated full-screen mobile drawer; all links smooth-scroll to their section
- Hero: line-by-line headline reveal, fading/scaling hero image, subtly floating decorative dots, animated scroll indicator
- Signature cakes: 6-card showcase with image zoom, dark overlay, and CTA reveal on hover; swipeable horizontal carousel on mobile
- Custom Cake Experience: fully interactive frontend demo — flavour, style, and colour selectors update a live summary line (no backend, as specified)
- Why Choose Us: 4-point trust section with scroll-triggered reveals
- Our Story: baker portrait, story copy, pull quote, "Meet the Baker" tag
- How It Works: animated horizontal timeline on desktop, vertical on mobile
- Gallery: filterable editorial masonry (Birthday / Wedding / Kids / Floral / Theme / Minimal) with a custom fullscreen lightbox (name, category, next/previous, keyboard support)
- Reviews: testimonial carousel with autoplay + dot navigation, "500+ Happy Celebrations" stat
- Social section: Instagram-style hover grid
- Order form: full enquiry form (contact details, occasion, date, servings, flavour, theme, budget, delivery/pickup, notes) with a drag-and-drop "Upload Inspiration" zone and a polished animated success state — validates and works entirely on the frontend, as specified
- Contact section with WhatsApp / Call / Instagram actions
- Final full-bleed CTA with subtle parallax
- `prefers-reduced-motion` respected throughout; visible focus states; semantic HTML, form labels, and alt text on every image

## Customizing content

- **Cake categories, gallery items, testimonials:** edit directly in `index.html` — each section is clearly commented (`<!-- ============================== SECTION NAME ============================== -->`).
- **Contact details, hours, socials:** the Contact section and footer.
- **Colors/fonts:** edit the `:root` variables at the top of `css/style.css` — every color and font in the site derives from those tokens.

## Notes for going to production

- Replace placeholder Unsplash imagery with your own cake photography.
- Wire the "Send Cake Enquiry" form to a real backend or email service (it currently validates and shows a success state client-side only, with no network request, and the "Upload Inspiration" field only previews the filename — it does not upload anywhere).
- Update the social links (`#`) and WhatsApp link in the footer/contact section to your real profiles and number.
- Consider adding a real map embed if you want the location to be interactive.
