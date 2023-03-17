import { Message } from './Message'
import { onPageHide } from '../util'
import { DEFAULT_GLOBAL_CONFIG } from './Channel.default'

/**@type {Map<microAppCode,microAppContext>} */
const microAppMap = new Map()
/**@type {WeakMap<microAppContext,microAppCode>} */
const microAppElMap = new WeakMap()
/**
 * @typedef {Map<microAppContext,object>} IStateMap
 * @description 组件状态Map
 * @type {IStateMap}
 */
const stateMap = new Map()

/**
 * @class Channel
 */
export class Channel extends Message {
  /**
   * @description 新建一个目标连接频道
   * @constructor
   * @param { Window | windowContent} target 目标上下文
   * @param {ChannelOpts} options 其它参数
   */
  constructor (target, options = {}) {
    super(target, options)
    this.appCode = options.appCode
    this.localStorageName = options.localStorageName || 'globalConfig'
    this._configResponse(this)
    this._stateResponse(this)
  }

  /**
   * !应用注册的主要逻辑
   * @description 设置当前应用的AppCode
   * @param {string} val
   * @returns {void}
   */
  setAppCode (val) {
    this.appCode = val
    // todo 当前应用不是子应用，则向主应用注册
    this.__pageHideCancel?.()
    this.__maintainCancel?.()
    // todo 自动向父级注册
    if (window.parent !== window) {
      window.parent.postMessage('message', '*')
      this.send(window.parent, {
        target: 'parent',
        type: 'register'
      }) //todo 自动拉取全局应用配置
        .then(res => {
          return this.send(window.parent, {
            target: 'main',
            type: 'config'
          })
        }) //todo 本地持久化
        .then(res => {
          localStorage.setItem(this.localStorageName, JSON.stringify(res.data))
        })
    }
    // todo 维护子应用注册表
    this.__maintainCancel = this.on(res => {
      const microAppCode = res.sourceCode
      if (res.type === 'register') {
        //todo 注册
        const el = document.getElementById('gislife-' + microAppCode)
        if (el) {
          this.registerApp(microAppCode, el)
        } else {
          console.error('register error, can not find element')
        }
      }
    })
    // todo 消息派发的主要逻辑
    this.__cancelPassive = this._onPassive()
  }

  /**
   * !消息派发的主要逻辑
   * todo 如果消息没有target 默认target为 main
   * @description 为每条消息带上popSource
   * @param {IPostMessageSyntax<T>} msg
   * @param {?Window} target
   * @returns {Promise<IPostMessageSyntax<T>>}
   */
  send (target, msg) {
    msg.sourceCode =
      msg.sourceCode === undefined ? this.appCode : msg.sourceCode
    msg.pop = msg.pop === undefined ? true : msg.pop
    //todo 如果target不存在于当前Map则向全局发送消息
    if (!target) {
      const parent = window.parent !== window ? [window.parent] : []
      const sibling = []
      microAppMap.forEach((value, key) => {
        sibling.push(value.contentWindow)
      })
      return Promise.all(
        parent.concat(sibling).map(tar => super.send(tar, msg))
      )
    } else {
      // todo如果target是'main'则直接向上传递消息；
      return super.send(target, msg)
    }
  }
  /**
   * todo 响应自己的消息，如果不是自己的消息则传递消息
   * @description 监听消息，并在自动取消监听
   * @param {IGenericFunction<IPostMessageSyntax<*>,void>} cb 监听到消息的回调函数
   * @param { Vue.Component } context 组件上下文
   * @returns {cancelCallback} 取消监听的回调函数
   */
  on (cb) {
    return super.on(msg => {
      if (!msg.target) throw Error('on message error, missing msg target')
      // todo 如果消息的目标是当前目标或者为'parent'，则直接响应消息
      if (msg.target === this.appCode || msg.target === 'parent') {
        cb(msg)
      }
    })
  }

  /**
   * @description 注册子应用
   * @param {string} appCode 子应用Code
   * @param {HTMLIFrameElement} target 子应用Iframe元素
   */
  registerApp (appCode, target) {
    if (microAppMap.has(appCode)) return
    microAppMap.set(appCode, target)
    microAppElMap.set(target, appCode)
  }
  /**
   * @description 取消注册子应用
   * @param {string} appCode 子应用Code
   */
  unRegisterApp (appCode) {
    console.log('unregister', appCode)
    return microAppMap.delete(appCode)
  }
  /**
   * @typedef {[string,HTMLIFrameElement] } targetLike
   * @param {targetLike | undefined} target
   */
  getApp (target) {
    let res
    if (target instanceof HTMLIFrameElement) {
      const tarCode = microAppElMap.get(target)
      if (tarCode) res = [tarCode, tar]
    }
    if (typeof target === 'string') {
      const tar = microAppElMap.get(target)
      if (tar) res = [tarCode, tar]
    }
    if (!res) console.warn('getApp error,target named:', target, microAppMap)
    return res
  }
  /**
   * @description 销毁实例，取消事件监听
   */
  destory () {
    this.__maintainCancel()
    this.__pageHideCancel()
    super.destory()
  }

  /**
   * @param {microAppCode} microAppCode
   * @returns {object | undefined}
   */
  getState (microAppCode) {
    let res
    res = stateMap.get(microAppCode)
    return res
  }
  /**
   *
   * @param {microAppCode} microAppCode
   * @param {object} state
   * @returns {IStateMap}
   */
  setState (microAppCode, state) {
    return stateMap.set(microAppCode, state)
  }
  /**
   * @description
   * @param {Channel} context
   */
  _configResponse (context) {
    context.defaultResponseInterceptor.push(data => {
      if (data?.data?.type === 'config') {
        //todo 传递config
        const config = JSON.parse(localStorage.getItem(this.localStorageName))
        data.data.data = window[DEFAULT_GLOBAL_CONFIG] || config
      }
      return data
    })
  }

  _onPassive () {
    return super.on(msg => {
      // todo 传递消息
      if (
        msg.target !== 'parent' &&
        msg.type !== 'state' &&
        msg.target !== this.appCode
      ) {
        if (this.appCode === 'main') msg.pop = false
        // todo 如果是main,则向上传递；如果不是，则全局传递
        if (msg.target === 'main') {
          if (window.parent !== window) this.send(window.parent, msg)
        } else {
          // todo 如果不是，则需要向sibling和parent同时传递
          microAppMap.forEach((tar, tarCode) => {
            if (tarCode !== msg.sourceCode) {
              this.send(tar.contentWindow, msg)
            }
          })
          if (window.parent !== window && msg.pop === true) {
            this.send(window.parent, msg)
          }
        }
      }
    })
  }

  /**
   * @description
   * @param {Channel} context
   */
  _stateResponse (context) {
    context.defaultResponseInterceptor.use(msg => {
      if (msg.data.type === 'state') {
        msg.data.data = stateMap.get(msg.data.sourceCode)
      }
      return msg
    })
  }
}
