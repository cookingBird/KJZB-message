/**
 * @author dengtao
 */
import './polyfill';
import * as Utils from './util'
import { ApplicationChannel } from './ApplicationChannel'
import microAppVue from './microApp.vue'

/**
 * @typedef ParamsType
 * @type {object}
 * @property {string} appCode
 * @property {string} microAppCode
 */
const connector = new ApplicationChannel()
connector.applicationBootstrap()

export { Utils, connector }

export default {
  install (vue, options = {}) {
    if (options.configKey) {
      connector.setGlobalConfigField(configKey)
    }

    Object.defineProperty(vue.prototype, '$connector', {
      get () {
        return connector
      },
      set (v) {
        throw Error("$connector can't set value")
      }
    })
    vue.component(microAppVue.name, microAppVue)
  }
}
