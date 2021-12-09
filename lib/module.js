'use strict';

const path = require('path');
const defu = require('defu');
const ms = require('ms');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

const defu__default = /*#__PURE__*/_interopDefaultLegacy(defu);
const ms__default = /*#__PURE__*/_interopDefaultLegacy(ms);

var name = "@proply/strapi";
var version = "0.3.7";

const defaults = {
  version: 3,
  url: process.env.STRAPI_URL || "http://localhost:1337",
  entities: [],
  key: "strapi_jwt",
  expires: "session",
  cookie: {}
};
async function strapiModule(moduleOptions) {
  const {nuxt} = this;
  const options = defu__default['default'](moduleOptions, nuxt.options.strapi, defaults);
  if (typeof options.expires === "string" && options.expires !== "session") {
    options.expires = ms__default['default'](options.expires);
  }
  nuxt.options.publicRuntimeConfig = nuxt.options.publicRuntimeConfig || {};
  nuxt.options.publicRuntimeConfig.strapi = nuxt.options.publicRuntimeConfig.strapi || {};
  nuxt.options.publicRuntimeConfig.strapi.url = options.url;
  const runtimeDir = path.resolve(__dirname, "runtime");
  nuxt.options.alias["~strapi"] = runtimeDir;
  nuxt.options.build.transpile.push(runtimeDir, "destr", "requrl", "hookable", "ufo");
  this.addPlugin({
    src: path.resolve(runtimeDir, "plugin.js"),
    fileName: "strapi.js",
    options
  });
  await this.requireModule("@nuxt/http");
  await this.requireModule("cookie-universal-nuxt");
}
strapiModule.meta = {name, version};

module.exports = strapiModule;
