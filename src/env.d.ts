/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_NAME: string
  readonly PUBLIC_X_URL: string
  readonly PUBLIC_GITHUB_REPOSITORY_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
