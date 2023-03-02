/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ISPORTS_API_URL: string;
  readonly VITE_ISPORTS_AFL_ID: string;
  readonly VITE_ADMIN_PREFIX: string;
  readonly VITE_LOGIN_ROUTE: string;
  readonly VITE_DEFAULT_ADMIN_ROUTE: string;
  readonly VITE_DEFAULT_PUBLIC_ROUTE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
