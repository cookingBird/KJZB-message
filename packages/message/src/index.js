/**
 * @author dengtao
 */
import * as Utils from './util'
import * as Tools from './tool'
import { ApplicationChannel } from './ApplicationChannel'
import microAppVue from './microApp.vue'

/**
 * @typedef ParamsType
 * @type {object}
 * @property {string} appCode
 * @property {string} microAppCode
 */
const connector = new ApplicationChannel()

export { Utils, connector, Tools }

export default {
  install (vue, options = {}) {
    if (options.configKey) {
      connector.setGlobalConfigField(configKey)
    }
    connector.applicationBootstrap()
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
