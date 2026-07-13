import type { EpkContent } from './types'

export const enContent: EpkContent = {
  pageTitle: 'In Thorns — Press Kit 2026',
  header: {
    tag: 'Press Kit · 2026',
    contactLabel: 'Contact',
    langLink: { label: 'Suomeksi →', href: '/press-kit-fi' },
  },
  hero: {
    eyebrow: 'Press Kit',
    subHtml:
      '<strong>Finnish metalcore collective from Jyväskylä.</strong> New single <em>"wormhusk"</em> out now (May 29, 2026). Crushing soundscapes, darkly poetic lyrics, surrealist horror staging.',
  },
  facts: {
    sectionLabel: 'A0 / At a glance',
    sectionSub: 'Copy-paste facts',
    heading: 'Quick facts',
    grid: [
      { k: 'Origin', v: 'Jyväskylä', sub: 'Central Finland · est. 2022' },
      { k: 'Genre', v: 'Metalcore', sub: 'Post · alternative · surrealist' },
      { k: 'Members', v: '4', sub: 'Three-vocalist attack' },
      { k: 'Accolades', v: '#8 \'24', sub: 'Newcomer of the year · Kaaoszine' },
    ],
    stats: [
      { n: '02', k: 'Singles · 2026', sub: 'exit wounds · wormhusk' },
      { n: '01', k: 'Album', sub: 'tlbocs · 2024' },
      { n: '06', k: 'Tour dates', sub: 'Spring 2026 · FI' },
      { n: 'FI', k: 'Territory', sub: 'EN / FI press' },
    ],
  },
  bio: {
    sectionLabel: 'A1 / Biography',
    sectionSub: 'Long · short · one-liner',
    heading: 'Biography',
    paragraphsHtml: [
      'Jyväskylä-based Finnish metalcore collective <strong>In Thorns</strong> releases new single <em>"wormhusk"</em> on May 29, 2026 — the second chapter of a new cycle following <em>"exit wounds"</em> (January 2026) and their acclaimed debut album <em>"the last bead on a cord of songs"</em> (2024), which placed top 10 in Kaaoszine\'s newcomer of the year readers\' poll.',
      'The collective creates metalcore driven by crushing soundscapes, nihilistic and darkly poetic lyrics, and soaring melodies. Drawing on surrealist art and horror, In Thorns delivers an immersive experience that balances devastating heaviness with haunting beauty. Live, the band\'s tight, high-energy performance pulls audiences into a dark, surreal world.',
    ],
    shortBio: {
      label: 'Short bio',
      count: '~50 words',
      html: 'In Thorns is a four-piece metalcore collective from Jyväskylä, Finland. Following top 10 newcomer of the year recognition for their 2024 debut, the band\'s 2026 cycle — singles <em>"exit wounds"</em> and <em>"wormhusk"</em> — pairs crushing weight with surrealist, horror-tinged staging and darkly poetic lyrics.',
    },
    oneliner: {
      label: 'One-liner',
      sublabel: 'For listings',
      html: 'Finnish metalcore collective from Jyväskylä — crushing, poetic, surreal. New single <em>"wormhusk"</em> out now.',
    },
  },
  lineup: {
    sectionLabel: 'A2 / Line-up',
    sectionSub: 'Four members',
    heading: 'Line-up',
    members: [
      { num: '01', name: 'Kristian Ruutala', role: 'Harsh Vocals' },
      { num: '02', name: 'Aleksi Statsevich', role: 'Harsh Vocals' },
      { num: '03', name: 'Aavee Tikkanen', role: 'Vocals · Guitar' },
      { num: '04', name: 'Jimi Kinnunen', role: 'Drums' },
    ],
  },
  releases: {
    sectionLabel: 'A3 / Releases',
    sectionSub: '2024 → 2026',
    heading: 'Releases',
    items: [
      {
        slug: 'wormhusk',
        title: 'wormhusk',
        type: 'single',
        theme: 'wh',
        tag: 'New — May 29',
        cover: '/music/WH SINGLE ART.png',
        meta: 'Single · 2026 · Self-released',
        desc: 'The second single of the cycle — claustrophobic, oppressive, a slow violet dread.',
        links: [
          { label: 'Listen', url: 'https://distrokid.com/hyperfollow/inthorns/wormhusk' },
          { label: 'Spotify', url: 'https://open.spotify.com/artist/4b0Yziy8xm1VtefVI9ri2d' },
        ],
      },
      {
        slug: 'exit-wounds',
        title: 'exit wounds',
        type: 'single',
        theme: 'primary',
        tag: 'Single — Jan 23',
        cover: '/music/exit-wounds-cover.webp',
        meta: 'Single · 2026 · Self-released',
        desc: 'The first artefact of the cycle — heavier, leaner, cinematic. "The pain won\'t cease."',
        links: [
          { label: 'Listen', url: 'https://distrokid.com/hyperfollow/inthorns/exit-wounds' },
          { label: 'Spotify', url: 'https://open.spotify.com/artist/4b0Yziy8xm1VtefVI9ri2d' },
        ],
      },
      {
        slug: 'the-last-bead-on-a-cord-of-songs',
        title: 'the last bead on a cord of songs',
        type: 'album',
        theme: 'secondary',
        tag: 'Album',
        cover: '/music/tlboacos-album.webp',
        meta: 'Debut LP · 2024 · 8 tracks',
        desc: 'Nihilistic soundscapes and soaring melodies. Top 10 newcomer of the year 2024 — Kaaoszine readers\' poll.',
        links: [
          { label: 'Spotify', url: 'https://open.spotify.com/album/4wUaeA2NL4yZq0OOzw8xUy' },
          { label: 'Apple Music', url: 'https://music.apple.com/tr/album/the-last-bead-on-a-cord-of-songs/1723544456' },
          { label: 'YT Music', url: 'https://music.youtube.com/playlist?list=OLAK5uy_kS6yu_-rFmwegiEajR2Ey7JPOCLe7FEpw' },
          { label: 'Deezer', url: 'https://www.deezer.com/fi/album/529196392' },
        ],
      },
    ],
  },
  press: {
    sectionLabel: 'A4 / Press',
    sectionSub: 'Pull quotes',
    heading: 'Press',
    placeholder: 'Press quotes coming soon.',
  },
  photos: {
    sectionLabel: 'A5 / Photos',
    sectionSub: 'Hi-res · credit required',
    heading: 'Press photos',
    items: [
      { src: '/photos/exit_wounds/1.webp', caption: 'Promo · primary', ext: 'WEBP' },
      { src: '/photos/exit_wounds/2.webp', caption: 'Promo · alley', ext: 'WEBP' },
      { src: '/photos/exit_wounds/3.webp', caption: 'Promo · church', ext: 'WEBP' },
      { src: '/photos/live/poppari_2025/_X2A6176.webp', caption: 'Live · Poppari', ext: 'WEBP' },
      { src: '/photos/live/poppari_2025/_X2A7434.webp', caption: 'Live · crowd', ext: 'WEBP' },
      { src: '/photos/exit_wounds/4.webp', caption: 'Promo · color', ext: 'WEBP' },
    ],
    credit: 'Photo credit: on file · request originals via booking email',
  },
  downloads: {
    sectionLabel: 'A6 / Assets',
    sectionSub: 'Download bundle',
    heading: 'Downloads',
    files: [
      { ext: 'ZIP', name: 'Photo pack', sub: 'Hi-res promo photos', href: '/photos/exit_wounds/promo.zip', arrow: '↓', isDownload: true },
      { ext: 'SVG', name: 'Logo pack', sub: 'Wordmark · mono + cream', href: '/logo.zip', arrow: '↓', isDownload: true },
      { ext: 'DSP', name: 'Streaming links', sub: 'Spotify · Apple · YT · Deezer', href: 'https://open.spotify.com/artist/4b0Yziy8xm1VtefVI9ri2d', arrow: '↗' },
    ],
  },
  contact: {
    sectionLabel: 'A7 / Contact',
    sectionSub: 'Booking · press',
    heading: 'Contact',
    leftRows: [
      { k: 'Booking', v: 'inthornsband@gmail.com', href: 'mailto:inthornsband@gmail.com' },
      { k: 'Based', v: 'Jyväskylä, Finland' },
    ],
    rightRows: [
      { k: 'Spotify', v: '@InThorns', href: 'https://open.spotify.com/artist/4b0Yziy8xm1VtefVI9ri2d' },
      { k: 'Instagram', v: '@inxthorns', href: 'https://www.instagram.com/inxthorns/' },
      { k: 'YouTube', v: '@inthornsband', href: 'https://www.youtube.com/@inthornsband' },
    ],
    ctaLabel: 'inthornsband@gmail.com',
  },
  footer: {
    left: '© 2026 IN THORNS · Jyväskylä, FI',
    right: "Press kit · The pain won't cease.",
  },
}
