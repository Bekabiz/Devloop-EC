# DEVELOP EC — Website Build Brief

## Brand
**Develop EC** *by Adamopoulos & Partners*
Tagline: "From Design to Construction" / "Από τη Μελέτη στην Κατασκευή"

## What This Is
A cinematic, ultra-premium single-page website for a Greek civil engineering and construction company. This must look like a €10,000 agency build. It is the developer's portfolio piece — jaw-dropping quality is non-negotiable.

## Company Info
- **Company:** Develop EC IKE (construction arm) + Adamopoulos & Partners (design/engineering office)
- **Owner:** Georgios Adamopoulos — MSc Structural Civil Engineer, National Technical University of Athens (NTUA). Master's in Local Development, University of Piraeus.
- **Founded:** 2018
- **Locations:** Pyrgos, Ilia + Athens, Greece
- **Regions served:** Ilia, Attica, Cyclades, Thessaly, Messinia, Ionian Islands — projects across all of Greece
- **Services:** Structural & architectural studies, licensing/permits, construction management, residential buildings, housing complexes, tourist facilities, industrial units, reinforced concrete & metal structures, renovations, feasibility studies, development funding programs
- **Clients:** Private individuals, businesses, hotel/hospitality, investors
- **Email:** adamopoulos.gm@gmail.com
- **Instagram:** @adamopoulos_ge
- **Old domain (inactive):** adamopoulosandpartners.gr

## Tech Stack
- React + Vite
- Lenis (smooth scroll — `@studio-freight/lenis`)
- GSAP + ScrollTrigger (pinning, scrub animations)
- CSS Modules or styled-components (no Tailwind — this needs hand-crafted CSS)
- No CMS — static content, images referenced directly
- Deploy target: Vercel

## Brand Colors — BLACK / WHITE / GRAY ONLY
- Background: `#0A0A0A` (near-black)
- Surface: `#141414` (cards, sections)
- Border/divider: `#222222`
- Muted text: `#666666`
- Secondary text: `#999999`
- Primary text: `#FFFFFF`
- Accent: `#E0E0E0` (warm white for emphasis)
- NO teal, NO color accents. Pure monochrome. The photos bring all the color.

## Typography Direction
- Display: Ultra-light or thin weight geometric sans — wide letter-spacing, uppercase. Think: Josefin Sans Light, Montserrat Thin, or Didot for maximum elegance
- Body: Clean sans-serif (Inter Light, DM Sans Light)
- Navigation: ALL CAPS, wide letter-spacing (0.3em+), thin weight
- Hero title: Massive, thin, tracked-out letters — like aristidesdallas.gr
- Use dramatic size contrast between hero text and body
- Letter-spacing on ALL headings and labels — this is the signature

## Design Direction
Black and white only. Ultra-premium architectural studio aesthetic. 
Reference: aristidesdallas.gr — wide-letter-spaced uppercase nav, full-bleed hero with video, logo mark top-left, minimal navigation, monochrome palette with photos providing the only color.
Also reference: Kube Contractors (kubecontractors.com), kononenkogroup.com.
NOT a generic construction company site — no hard hats, no colored accents, no gradients. The restraint IS the luxury.

---

## PAGE STRUCTURE (single-page, scroll-driven)

### Section 1: HERO
- Full viewport height, dark background
- Logo: Develop EC monogram (the 3D isometric DEC mark from `assets/projects/logo/develop-ec-logo.png`)
- Text hierarchy:
  - "Develop EC" — large display type
  - "by Adamopoulos & Partners" — smaller, lighter weight
  - "From Design to Construction" — tagline, subtle
- Background: drone video playing silently on loop, desaturated or with dark overlay. Use `assets/projects/hero/drone-hero.mp4` with `assets/projects/hero/poster.jpg` as poster
- Subtle scroll indicator at bottom (thin line or arrow)
- Fade-in animation on load (staggered text reveal)

### Section 2: CINEMATIC SCROLL REVEAL (DRONE VIDEO SCRUB)
- GSAP ScrollTrigger `pin: true`, `scrub: true`
- A `<canvas>` element draws frames from the drone video sequence as user scrolls
- 32 pre-extracted frames in `assets/projects/hero/frames/frame_001.jpg` through `frame_032.jpg`
- As the user scrolls, the canvas paints the corresponding frame — the drone orbits the mansion
- This is the Apple-style frame scrub technique
- Duration: 3x viewport height of scroll distance (slow, cinematic)
- Alternative: use `<video>` element with `currentTime` scrubbed by GSAP (simpler, use `assets/projects/hero/drone-hero.mp4`)
- Poster frame for loading: `assets/projects/hero/poster.jpg`
- End state: full-bleed final frame with subtle text overlay

### Section 3: SERVICES STRIP
- Minimal horizontal layout, three columns
- "Μελέτη" (Design) → "Αδειοδότηση" (Permitting) → "Κατασκευή" (Construction)
- Each with a one-line description
- Subtle divider lines between them
- Scroll-triggered fade-in
- Copy:
  - Μελέτη: "Αρχιτεκτονικές και στατικές μελέτες που συνδυάζουν αισθητική και λειτουργικότητα."
  - Αδειοδότηση: "Πλήρης διαχείριση αδειοδοτήσεων και ένταξη σε αναπτυξιακά προγράμματα."
  - Κατασκευή: "Κατασκευή υψηλών προδιαγραφών με έμφαση στην ποιότητα και τη βιωσιμότητα."

### Section 4: SELECTED PROJECTS
- Project grid or horizontal scroll gallery
- Each project card: hero image, project name, location, type tag
- Hover effect: subtle zoom or parallax shift on image
- Click/tap opens a lightbox or detail overlay with multiple images
- Projects data:

```
1. Πολυκατοικία Τσαλδάρη — Πύργος Ηλείας — Πολυκατοικία
   Images: assets/projects/01-polykatoikia-pyrgos/
   Description: "Ανέγερση 5όροφης πολυκατοικίας με ισόγεια καταστήματα. Minimal σχεδιασμός, μεγάλα ανοίγματα, εξώστες έως 3m, smart home, ενεργειακή κλάση Α+."

2. Κλειστό Αθλητικό Κέντρο — Ηλεία — Δημόσιο Έργο
   Images: assets/projects/02-kleisto-athlitiko-kentro/

3. Τουριστικά Καταλύματα — Ηλεία — Τουριστική Μονάδα
   Images: assets/projects/03-touristika-katalymata/
   Description: "Ανέγερση νέας μονάδας τουριστικών καταλυμάτων στην Ηλεία."

4. Κατοικία Χαλανδρίου — Χαλάνδρι, Αττική — Κατοικία
   Images: assets/projects/04-chalandri/

5. Κατοικία Πύργου — Πύργος Ηλείας — Κατοικία
   Images: assets/projects/05-pyrgos-villa/

6. Έργο Μήλου — Νήσος Μήλος — Κατασκευή
   Images: assets/projects/06-milos-island/

7. Πολυκατοικία Αττικής — Αττική — Πολυκατοικία
   Images: assets/projects/07-completed-building/
```

### Section 5: CONSTRUCTION PROCESS
- Optional "behind the scenes" strip
- Horizontal scroll of construction-in-progress photos
- Images: assets/projects/construction-process/
- No text needed — just raw, powerful images of the work

### Section 6: ABOUT
- Split layout: text left, image right
- Image: use a construction site photo (the sunset rebar photo — photo_10)
- Heading: "Γεώργιος Αδαμόπουλος"
- Bio (rewrite this in premium tone):
  "MSc Δομοστατικός Πολιτικός Μηχανικός, ΕΜΠ. Με παρουσία σε έργα σε Ηλεία, Αττική, Κυκλάδες, Θεσσαλία, Μεσσηνία και Ιόνιο, η Develop EC προσφέρει ολοκληρωμένες υπηρεσίες — από τον σχεδιασμό και τη χρηματοδότηση μέχρι την κατασκευή."
- Stats row (optional): "50+ Έργα", "8+ Χρόνια", "6 Περιφέρειες"

### Section 7: CONTACT
- Dark section with contact form
- Fields: Όνομα (Name), Email, Μήνυμα (Message)
- Submit button: "Επικοινωνήστε" (Contact Us)
- Sidebar info:
  - Email: adamopoulos.gm@gmail.com
  - Location: Πύργος Ηλείας & Αθήνα
  - Instagram: @adamopoulos_ge

### Section 8: FOOTER
- Minimal
- Logo mark (small)
- "© 2026 Develop EC. All rights reserved."
- "Website by Evriel Systems"
- Links: Privacy Policy (placeholder for now)

---

## ANIMATION NOTES
- Lenis: smooth scroll with `duration: 1.2`, `easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))` (or similar ease-out)
- GSAP ScrollTrigger: use `scrub: true` for scroll-driven animations, `pin: true` for the cinematic reveal section
- Page load: staggered fade-in of hero elements (logo → title → tagline → scroll indicator), 0.15s stagger
- Section reveals: elements fade up with slight translateY as they enter viewport
- Project cards: subtle scale(1.02) on hover with 0.4s transition
- Respect `prefers-reduced-motion`: disable animations when enabled

## ASSETS LOCATION
All project photos are in: `assets/projects/` with subfolders per project.
Logo: `assets/projects/logo/develop-ec-logo.png`
Logo package (multiple formats): `assets/projects/logo/develop-ec-professional-logo-package.zip`
Video (if any): `assets/projects/hero/`

## LANGUAGE
Greek primary. English toggle can be added later — structure the content so text is in a separate data file (JSON or constants), not hardcoded in JSX.

## RESPONSIVE
Must be flawless on mobile. The cinematic scroll section should gracefully adapt — possibly simplified to a fade transition on mobile instead of complex scroll scrub.
