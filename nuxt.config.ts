// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['primeicons/primeicons.css'],

  serverHandlers: [
    {
      route: '/api/news',
      handler: '~/server/api/news.js',
    },
  ],
});
