# In Thorns Website Redesign - "Exit Wounds" Era

## 🎯 Goal
Complete website redesign with glitchy, orange/red/green aesthetic matching the "Exit Wounds" single era. One-page scrolling design with smooth animations.

---

## 📋 Phase 0: Setup & Prep
- [ ] Commit current state (Playwright setup, CLAUDE.md, gitignore updates)
- [ ] Create new git branch for redesign
- [ ] Audit current components and decide what to keep vs rebuild
- [ ] Set up new color scheme in Tailwind config

---

## 🎨 Phase 1: Visual Foundation

### Color System & Design Tokens
- [ ] Update Tailwind config with new color palette:
  - Primary: Orange/Red tones (#FF4500, #FF6B35, #FF8C42)
  - Accent: Dark Green/Teal (#1A4D2E, #0D7377, #2C5F2D)
  - Base: Black (#000000)
  - Text: White/Cream (#FFFFFF, #F5F5DC)
- [ ] Add film grain texture/overlay
- [ ] Set up typography (keep aggressive/raw fonts)

### Glitch Effects & Animations
- [ ] Create CSS glitch effect utilities
- [ ] Implement barcode scan line component
- [ ] Add RGB split effect on hover (for images)
- [ ] Create smooth scroll behavior
- [ ] Set up scroll-triggered fade-in animations
- [ ] Integrate itbg.gif strategically (hero or section dividers)

**Commit:** "Add glitchy visual foundation and color system"

---

## 🏠 Phase 2: Hero Section

### Hero Components
- [ ] Full-screen hero section with gradient overlay
- [ ] Logo with glitch animation on load
- [ ] Tagline: "Let's sail into the unknown"
- [ ] "Exit Wounds" callout with release date (23.1.2025)
- [ ] Scroll indicator/arrow
- [ ] Background: Use exit_wounds promo photo with orange/red tones
- [ ] Optional: Subtle parallax effect on background

**Commit:** "Build hero section with Exit Wounds announcement"

---

## 🎵 Phase 3: Music Section

### Latest Release - Exit Wounds Single
- [ ] Section header with barcode divider
- [ ] Single artwork/teaser (if available, or use promo photos)
- [ ] Release date countdown/announcement: "Out 23.1.2025"
- [ ] Pre-save/follow links placeholder (for when links are ready)
- [ ] Add note: "Links coming soon"

### Album Showcase
- [ ] "the last bead on a cord of songs" album section
- [ ] Album artwork (TLBOACOS.jpg)
- [ ] Spotify embed or link button
- [ ] Album link: https://open.spotify.com/album/4wUaeA2NL4yZq0OOzw8xUy

**Commit:** "Add music section with Exit Wounds and album"

---

## 📅 Phase 4: Tour Dates Section

### Bandsintown Integration
- [ ] Keep existing Bandsintown API integration
- [ ] Update events.astro component with new styling
- [ ] Orange/red/green color scheme for event cards
- [ ] Glitch effect on hover
- [ ] Barcode divider before/after section
- [ ] Mobile-responsive layout

**Commit:** "Redesign tour dates section"

---

## 📸 Phase 5: Photos/Gallery Section

### Gallery Layout
- [ ] Grid layout for exit_wounds promo photos
- [ ] Use all 8 photos from public/exit_wounds/
- [ ] Hover effects (RGB split or glitch)
- [ ] Responsive grid (1 col mobile, 2 col tablet, 3-4 col desktop)
- [ ] Film grain overlay on images
- [ ] Optional: Lightbox for full-size viewing

**Commit:** "Add photo gallery with Exit Wounds promo shots"

---

## 📖 Phase 6: About/Bio Section

### Band Info
- [ ] Section with darker background
- [ ] Finnish bio (current text, will be updated later)
- [ ] Band member list with styling
- [ ] Glitchy text effects or barcode accents
- [ ] Mobile-friendly layout

**Commit:** "Add about/bio section"

---

## 🔗 Phase 7: Footer & Navigation

### Footer
- [ ] Social media icons (IG, Spotify, YouTube, FB)
- [ ] Contact email: inthornsband@gmail.com
- [ ] Copyright info
- [ ] Glitchy border/divider at top

### Navigation
- [ ] Horizontal nav with anchor links (sticky header)
- [ ] Links: Music, Tour, Photos, About, Contact
- [ ] Smooth scroll to sections
- [ ] Active section indicator
- [ ] Glitch effect on hover
- [ ] Mobile: keep horizontal or compact layout

**Commit:** "Add footer and navigation"

---

## ✨ Phase 8: Polish & Refinement

### Performance
- [ ] Optimize exit_wounds images (or note for later)
- [ ] Lazy load images
- [ ] Minimize CSS/JS

### Cross-browser Testing
- [ ] Test in Chrome, Firefox, Safari
- [ ] Test on mobile devices (responsive)
- [ ] Run Playwright review script
- [ ] Fix any layout issues

### Accessibility
- [ ] Check color contrast ratios
- [ ] Add alt text to all images
- [ ] Keyboard navigation works
- [ ] Screen reader friendly

**Commit:** "Polish and optimize site"

---

## 🧪 Phase 9: Review & Final Touches

### Visual Review
- [ ] Run `node review-site.mjs` to capture screenshots
- [ ] Compare against Exit Wounds aesthetic
- [ ] Adjust colors/effects as needed
- [ ] Get feedback from user

### Final Commit
- [ ] Final review commit
- [ ] Update CLAUDE.md with new architecture notes
- [ ] Ready for merge/deployment

---

## 🎯 Key Design Principles

**Visual Identity:**
- Orange/Red dominance with Green/Teal accents
- Heavy film grain and glitch effects
- Barcode scan lines as dividers
- Motion blur aesthetic from promo photos
- Raw, underground, experimental vibe

**Technical:**
- One-page smooth scroll design
- Horizontal anchor navigation
- Mobile-responsive
- Bandsintown API integration (keep existing)
- Smooth animations on scroll

**Content Priority:**
1. Exit Wounds announcement (23.1.2025)
2. Album showcase
3. Tour dates
4. Visual identity through photos
5. Band info

---

## 📝 Content Assets

**Images:**
- Logo: it-logo.png, it-logo-white.png
- Glitch animation: itbg.gif
- Album art: TLBOACOS.jpg
- Promo photos: public/exit_wounds/*.jpg (8 photos)

**Links:**
- Album: https://open.spotify.com/album/4wUaeA2NL4yZq0OOzw8xUy
- Social: IG, Spotify, YouTube, Facebook (same as before)

**Text:**
- Hero: "Let's sail into the unknown"
- Release: "Exit Wounds - Out 23.1.2025"
- Bio: (Keep current Finnish bio for now)
- Contact: inthornsband@gmail.com

---

## 🚀 Execution Notes
- Commit after each phase completion
- DO NOT push to remote
- Test with Playwright after major changes
- Keep Bandsintown integration intact
- User will provide updated bio content later
