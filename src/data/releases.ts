export interface Release {
  slug: string
  title: string
  type: 'single' | 'album' | 'ep'
  theme: 'wh' | 'primary' | 'secondary'
  tag: string
  cover: string
  meta: string
  desc: string
  links: { label: string; url: string }[]
}

export const releases: Release[] = [
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
      { label: 'YouTube', url: 'https://www.youtube.com/@inthornsband' },
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
      { label: 'YouTube', url: 'https://www.youtube.com/@inthornsband' },
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
    desc: 'Nihilistic soundscapes and soaring melodies. Newcomer of the Year 2024 — Kaaoszine readers\' poll.',
    links: [
      { label: 'Spotify', url: 'https://open.spotify.com/album/4wUaeA2NL4yZq0OOzw8xUy' },
      { label: 'Apple Music', url: 'https://music.apple.com/tr/album/the-last-bead-on-a-cord-of-songs/1723544456' },
      { label: 'YT Music', url: 'https://music.youtube.com/playlist?list=OLAK5uy_kS6yu_-rFmwegiEajR2Ey7JPOCLe7FEpw' },
      { label: 'Deezer', url: 'https://www.deezer.com/fi/album/529196392' },
    ],
  },
]
