interface ImportMetaEnv {
    readonly PUBLIC_STRIPE_API_KEY: string;
    readonly PUBLIC_MEDUSA_BACKEND_URL: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}