export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      link: [
        // General implementation from https://css-tricks.com/svg-favicons-and-all-the-fun-things-we-can-do-with-them/
        {
          rel: "icon",
          href: "/favicon.ico",
          sizes: "any",
        },
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg",
        },
      ],
      title: "Max & Maxer",
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "nuxt-vuefire",
    "@vite-pwa/nuxt",
  ],
  vuefire: {
    config: {
      apiKey: "AIzaSyDPKEOY99oWSdi7zj08aLsoWUKl_H3Efb4",
      authDomain: "max-and-maxer.firebaseapp.com",
      projectId: "max-and-maxer",
      appId: "1:951535404287:web:5bb70303b68dcfb02438ca",
    },
  },
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Max & Maxer",
      short_name: "Maxer",
      description: "An app to keep track of your PRs.",
      dir: "ltr",
      display: "browser",
      display_override: [
        "standalone",
        "minimal-ui",
      ],
      theme_color: "#0d0b14",
      background_color: "#161221",
      orientation: "portrait",
      handle_links: "auto",
      edge_side_panel: {},
      id: "/",
      launch_handler: {
        client_mode: "auto",
      },
      icons: [
        {
          src: "maxer-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "maxer-512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "maxer-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "maxer-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
  },
});
