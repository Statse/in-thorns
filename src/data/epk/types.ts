export interface EpkPhoto {
  src: string
  caption: string
  ext: string
}

export interface EpkFile {
  ext: string
  name: string
  sub: string
  href: string
  arrow: string
  isDownload?: boolean
}

export interface EpkMember {
  num: string
  name: string
  role: string
}

export interface EpkRelease {
  slug: string
  title: string
  type: 'single' | 'album'
  theme: 'wh' | 'primary' | 'secondary'
  tag: string
  cover: string
  meta: string
  desc: string
  links: { label: string; url: string }[]
}

export interface EpkStat {
  n: string
  k: string
  sub: string
  isTourCount?: boolean
}

export interface EpkContent {
  pageTitle: string
  header: {
    tag: string
    contactLabel: string
    langLink: { label: string; href: string }
  }
  hero: {
    eyebrow: string
    subHtml: string
  }
  facts: {
    sectionTitle: string
    sectionSub: string
    heading: string
    grid: { k: string; v: string; sub: string }[]
    stats: EpkStat[]
  }
  bio: {
    sectionTitle: string
    sectionSub: string
    heading: string
    longLabel: string
    wordsLabel: string
    paragraphsHtml: string[]
    shortBio: { label: string; html: string }
    oneliner: { label: string; sublabel: string; html: string }
  }
  lineup: {
    sectionTitle: string
    sectionSub: string
    heading: string
    members: EpkMember[]
  }
  releases: {
    sectionTitle: string
    sectionSub: string
    heading: string
    items: EpkRelease[]
  }
  press: {
    hidden?: boolean
    sectionTitle: string
    sectionSub: string
    heading: string
    placeholder: string
  }
  photos: {
    sectionTitle: string
    sectionSub: string
    heading: string
    items: EpkPhoto[]
    credit: string
  }
  downloads: {
    sectionTitle: string
    sectionSub: string
    heading: string
    files: EpkFile[]
  }
  contact: {
    sectionTitle: string
    sectionSub: string
    heading: string
    leftRows: { k: string; v: string; href?: string }[]
    rightRows: { k: string; v: string; href: string }[]
    ctaLabel: string
  }
  footer: { left: string; right: string }
}
