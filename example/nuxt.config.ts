import type { NuxtConfig } from '@nuxt/types'

export default <NuxtConfig>{
  buildModules: ['@nuxt/typescript-build'],
  modules: [
    '../src/module.ts'
  ],

  strapi: {
    url: 'https://api.proply.no',
    version: 4,
    entities: ['products']
  }
}
