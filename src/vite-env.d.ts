/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_CLIENT_ID: string;
  readonly VITE_CLIENT_SECRET: string;
  readonly VITE_MAP_API_BASE_URL: string;
  readonly VITE_AUTH_BASE_URL: string;
  readonly VITE_PLATFORM: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
