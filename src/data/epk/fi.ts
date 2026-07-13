import type { EpkContent } from './types'

export const fiContent: EpkContent = {
  pageTitle: 'In Thorns — Lehdistöpaketti 2026',
  header: {
    tag: 'Lehdistöpaketti · 2026',
    contactLabel: 'Yhteystiedot',
    langLink: { label: 'In English →', href: '/press-kit' },
  },
  hero: {
    eyebrow: 'Lehdistöpaketti',
    subHtml:
      '<strong>Jyväskyläläinen metallikollektiivi.</strong> Uusi single <em>"wormhusk"</em> nyt kuunneltavissa (29.5.2026). Tarttuva äänimaailma, synkät sanat, teatraalinen liveshow – kokemus, josta puhutaan vielä keikan jälkeenkin.',
  },
  facts: {
    sectionTitle: 'Lyhyesti',
    sectionSub: 'Pikafaktat',
    heading: 'Pikafaktat',
    grid: [
      { k: 'Kotipaikka', v: 'Jyväskylä', sub: 'Keski-Suomi · perust. 2022' },
      { k: 'Genre', v: 'Metalcore', sub: 'Post · alternative · surrealistinen' },
      { k: 'Jäsenet', v: '4', sub: 'Kolme laulajaa' },
      { k: 'Tunnustukset', v: '#8 \'24', sub: 'Vuoden tulokas · Kaaoszine' },
    ],
    stats: [
      { n: '02', k: 'Singlet · 2026', sub: 'exit wounds · wormhusk' },
      { n: '01', k: 'Albumi', sub: 'tlbocs · 2024' },
      { n: '00', k: 'Keikkapäivät', sub: 'Kevät 2026 · FI', isTourCount: true },
      { n: 'FI', k: 'Alue', sub: 'FI / EN lehdistö' },
    ],
  },
  bio: {
    sectionTitle: 'Biografia',
    sectionSub: 'Pitkä · lyhyt · iskulause',
    heading: 'Biografia',
    paragraphsHtml: [
      'Jyväskyläläinen metallikollektiivi <strong>In Thorns</strong> ammentaa soundiinsa 2000-luvun nu-metallin groove-pohjaista poljentaa, mutta myös modernin metallin murskaavaa intensiteettiä, luoden äänimaailman, joka on tarttuva, synkkä ja armoton.',
      'Kollektiivin liveperformanssi luo yleisölle alusta loppuun otteessaan pitävän, katseita kahlitsevan, teatraalisen ja ennen kaikkea energisen kokemuksen, josta puhutaan vielä keikan jälkeenkin.',
      'In Thorns julkaisi debyyttialbuminsa <em>"the last bead on a cord of songs"</em> vuoden 2024 tammikuussa ja lunasti paikkansa Kaaoszinen "Vuoden tulokas 2024" -listalla. Singlen "we are expendable" on voinut kuulla radiosoitossa YleX:n sekä Radio Rockin taajuuksilla. Vuonna 2025 kollektiivi kiersi mm. Vaasassa, Helsingissä, Oulussa sekä kotikaupungissaan Jyväskylässä. Vastaanotto on ollut yksiselitteinen – In Thornsia halutaan nähdä lavoilla lisää.',
      'Vuonna 2026 bändi julkaisi uudet singlet <em>"exit wounds"</em> ja <em>"wormhusk"</em> jotka maalaavat yhtyeen uuden, entistä anteeksipyytelemättömämmän tyylisuunnan.',
    ],
    shortBio: {
      label: 'Lyhyt bio',
      count: '~50 sanaa',
      html: 'In Thorns on neljähenkinen metallikollektiivi Jyväskylästä. Debyyttialbuminsa myötä Kaaoszinen "Vuoden tulokas 2024" -tunnustuksen saanut bändi jatkoi 2026 julkaisemalla singlet <em>"exit wounds"</em> ja <em>"wormhusk"</em> – murskaavaa, surrealistista metallia, josta puhutaan vielä keikan jälkeenkin.',
    },
    oneliner: {
      label: 'Iskulause',
      sublabel: 'Listauksiin',
      html: 'Jyväskyläläinen metallikollektiivi – tarttuva, synkkä, armoton. Uusi single <em>"wormhusk"</em> nyt kuunneltavissa.',
    },
  },
  lineup: {
    sectionTitle: 'Kokoonpano',
    sectionSub: 'Neljä jäsentä',
    heading: 'Kokoonpano',
    members: [
      { num: '01', name: 'Kristian Ruutala', role: 'Huutolaulu' },
      { num: '02', name: 'Aleksi Statsevich', role: 'Huutolaulu' },
      { num: '03', name: 'Aavee Tikkanen', role: 'Laulu · Kitara' },
      { num: '04', name: 'Jimi Kinnunen', role: 'Rummut' },
    ],
  },
  releases: {
    sectionTitle: 'Julkaisut',
    sectionSub: '2024 → 2026',
    heading: 'Julkaisut',
    items: [
      {
        slug: 'wormhusk',
        title: 'wormhusk',
        type: 'single',
        theme: 'wh',
        tag: 'Uusi — 29.5.',
        cover: '/music/WH SINGLE ART.png',
        meta: 'Single · 2026 · Omatuotanto',
        desc: 'Syklin toinen single — klaustrofobinen, painostava, hidas violetti ahdistus.',
        links: [
          { label: 'Kuuntele', url: 'https://distrokid.com/hyperfollow/inthorns/wormhusk' },
          { label: 'Spotify', url: 'https://open.spotify.com/artist/4b0Yziy8xm1VtefVI9ri2d' },
        ],
      },
      {
        slug: 'exit-wounds',
        title: 'exit wounds',
        type: 'single',
        theme: 'primary',
        tag: 'Single — 23.1.',
        cover: '/music/exit-wounds-cover.webp',
        meta: 'Single · 2026 · Omatuotanto',
        desc: 'Syklin ensimmäinen artefakti — raskaampi, leankempi, elokuvallinen. "The pain won\'t cease."',
        links: [
          { label: 'Kuuntele', url: 'https://distrokid.com/hyperfollow/inthorns/exit-wounds' },
          { label: 'Spotify', url: 'https://open.spotify.com/artist/4b0Yziy8xm1VtefVI9ri2d' },
        ],
      },
      {
        slug: 'the-last-bead-on-a-cord-of-songs',
        title: 'the last bead on a cord of songs',
        type: 'album',
        theme: 'secondary',
        tag: 'Albumi',
        cover: '/music/tlboacos-album.webp',
        meta: 'Debyytti-LP · 2024 · 8 kappaletta',
        desc: 'Nihilistiset äänimaisemoja ja kohoavat melodiat. Top 10 vuoden tulokas 2024 — Kaaoszinen lukijaäänestys.',
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
    hidden: true,
    sectionTitle: 'Lehdistö',
    sectionSub: 'Lainaukset',
    heading: 'Lehdistö',
    placeholder: 'Lehdistölainaukset tulossa.',
  },
  photos: {
    sectionTitle: 'Kuvat',
    sectionSub: 'Korkearesoluutio · lähde mainittava',
    heading: 'Promokuvat',
    items: [
      { src: '/photos/exit_wounds/1.webp', caption: 'Promo · primary', ext: 'WEBP' },
      { src: '/photos/exit_wounds/2.webp', caption: 'Promo · alley', ext: 'WEBP' },
      { src: '/photos/exit_wounds/3.webp', caption: 'Promo · church', ext: 'WEBP' },
      { src: '/photos/live/poppari_2025/_X2A6176.webp', caption: 'Live · Poppari', ext: 'WEBP' },
      { src: '/photos/live/poppari_2025/_X2A7434.webp', caption: 'Live · crowd', ext: 'WEBP' },
      { src: '/photos/exit_wounds/4.webp', caption: 'Promo · color', ext: 'WEBP' },
    ],
    credit: 'Valokuvaaja: tiedostossa · pyydä originaalit bookkaaussähköpostilla',
  },
  downloads: {
    sectionTitle: 'Materiaalit',
    sectionSub: 'Lataa paketti',
    heading: 'Lataukset',
    files: [
      { ext: 'ZIP', name: 'Kuvapaketti', sub: 'Korkearesoluutio promokuvat', href: '/photos/exit_wounds/promo.zip', arrow: '↓', isDownload: true },
      { ext: 'SVG', name: 'Logopaketti', sub: 'Wordmark · mono + cream', href: '/logo.zip', arrow: '↓', isDownload: true },
      { ext: 'DSP', name: 'Suoratoistolinkit', sub: 'Spotify · Apple · YT · Deezer', href: 'https://open.spotify.com/artist/4b0Yziy8xm1VtefVI9ri2d', arrow: '↗' },
    ],
  },
  contact: {
    sectionTitle: 'Yhteystiedot',
    sectionSub: 'Bookkaus · lehdistö',
    heading: 'Yhteystiedot',
    leftRows: [
      { k: 'Bookkaus', v: 'inthornsband@gmail.com', href: 'mailto:inthornsband@gmail.com' },
      { k: 'Kotipaikka', v: 'Jyväskylä, Suomi' },
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
    right: "Lehdistöpaketti · The pain won't cease.",
  },
}
