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
    sectionLabel: string
    sectionSub: string
    heading: string
    grid: { k: string; v: string; sub: string }[]
    stats: { n: string; k: string; sub: string }[]
  }
  bio: {
    sectionLabel: string
    sectionSub: string
    heading: string
    paragraphsHtml: string[]
    shortBio: { label: string; count: string; html: string }
    oneliner: { label: string; sublabel: string; html: string }
  }
  lineup: {
    sectionLabel: string
    sectionSub: string
    heading: string
    members: EpkMember[]
  }
  releases: {
    sectionLabel: string
    sectionSub: string
    heading: string
    items: EpkRelease[]
  }
  press: {
    sectionLabel: string
    sectionSub: string
    heading: string
    placeholder: string
  }
  photos: {
    sectionLabel: string
    sectionSub: string
    heading: string
    items: EpkPhoto[]
    credit: string
  }
  downloads: {
    sectionLabel: string
    sectionSub: string
    heading: string
    files: EpkFile[]
  }
  contact: {
    sectionLabel: string
    sectionSub: string
    heading: string
    leftRows: { k: string; v: string; href?: string }[]
    rightRows: { k: string; v: string; href: string }[]
    ctaLabel: string
  }
  footer: { left: string; right: string }
}
