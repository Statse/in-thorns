/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly BANDS_IN_A_TOWN_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
