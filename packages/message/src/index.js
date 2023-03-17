import * as Utils from './util'
export * from './core'
export * from './util'

import { ApplicationChannel } from './ApplicationChannel'
import microAppVue from './microApp.vue'

/**
 * @typedef ParamsType
 * @type {object}
 * @property {string} appCode
 * @property {string} microAppCode
 */

export const connector = new ApplicationChannel()
export default {
  install (vue) {
    if (window.parent !== window) {
      // TODO 获取子应用AppCode
      /**@type ParamsType */
      const params = Utils.getParams(window.location)
      // ! 子应用
      connector.setAppCode(params.microAppCode)
    } else {
      // ! 主应用
      connector.setAppCode('main')
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
