// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@bg-dev/nuxt-naiveui',
    'nuxt-icon',
    '@vueuse/motion/nuxt'
  ],
  googleFonts: {
    families: {
      'Noto Sans Lao': {
        wght: [100, 300, 400, 500, 700, 900],
      },
      'Josefin+Sans': true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100]
      },
    },
    display: 'swap'
  },
  css: ['@/assets/main.css'],
  tailwindcss: {
    exposeConfig: true,
    config: {
        theme: {
          extend: {
            backgroundImage: {
              'bg-header': "url('~/assets/image/homepage/bg-header.png')",
              'bg-banner': "url('~/assets/image/homepage/bg-banner.jpg')"
            },
            colors: {
              'primary': '#002749',
            }
          }
        }
    },
  },
  runtimeConfig: {
    public: { // For client-side access
      NHOST_SUBDOMAIN: process.env.NHOST_SUBDOMAIN + "",
      NHOST_REGION: process.env.NHOST_REGION + "",
      motion: {
        directives: {
          'pop-bottom': {
            initial: {
              scale: 0,
              opacity: 0,
              y: 100,
            },
            visible: {
              scale: 1,
              opacity: 1,
              y: 0,
            }
          }
        }
      }
    },
  },
  ssr: false
})
