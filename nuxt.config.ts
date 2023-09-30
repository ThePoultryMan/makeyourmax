export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "Max & Maxer",
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
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
      theme_color: "#161221",
    },
  },
});
