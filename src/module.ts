import { resolve } from 'path'
import defu from 'defu'
import ms from 'ms'
import { name, version } from '../package.json'
import { NuxtStrapiModuleOptions } from './runtime/types'

const defaults: NuxtStrapiModuleOptions = {
  version: 3,
  url: process.env.STRAPI_URL || 'http://localhost:1337',
  entities: [],
  key: 'strapi_jwt',
  expires: 'session',
  cookie: {}
}

async function strapiModule (moduleOptions) {
  const { nuxt } = this

  const options = defu(moduleOptions, nuxt.options.strapi, defaults) as NuxtStrapiModuleOptions

  if (typeof options.expires === 'string' && options.expires !== 'session') {
    options.expires = ms(options.expires)
  }

  nuxt.options.publicRuntimeConfig = nuxt.options.publicRuntimeConfig || {}
  nuxt.options.publicRuntimeConfig.strapi = nuxt.options.publicRuntimeConfig.strapi || {}
  nuxt.options.publicRuntimeConfig.strapi.url = options.url

  const runtimeDir = resolve(__dirname, 'runtime')
  nuxt.options.alias['~strapi'] = runtimeDir
  nuxt.options.build.transpile.push(runtimeDir, 'destr', 'requrl', 'hookable', 'ufo')

  this.addPlugin({
    src: resolve(runtimeDir, 'plugin.js'),
    fileName: 'strapi.js',
    options
  })

  await this.requireModule('@nuxt/http')
  await this.requireModule('cookie-universal-nuxt')
}

(strapiModule as any).meta = { name, version }

export default strapiModule
