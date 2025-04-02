import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import rlc from 'remark-link-card';
import sitemap from '@astrojs/sitemap';
// import compress from "astro-compress";
const isDev = import.meta.env.DEV;


// https://astro.build/config
export default defineConfig({
  site: isDev ? 'http://localhost:4321' : 'https://kuchibeta-coding.dev',
  markdown: {
    remarkPlugins: [[rlc, {
      shortenUrl: true
    }]]
  },
  integrations: [expressiveCode({
    themes: ['dark-plus', 'light-plus'],
    themeCssRoot: '.expressive-code',
    styleOverrides: {
      borderWidth: '1px',
      borderRadius: false,
      frames: {
        shadowColor: false
      }
    }
  }),
    mdx(),
    sitemap(),
    // compress({
    //   SVG: false
    // })
  ],
  server: {
    open: true
  }
});