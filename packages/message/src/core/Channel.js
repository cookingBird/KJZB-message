import { Message } from './Message'
import { isObject, getParams } from '../util'
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
    this._configResponse()
    this._stateResponse()
  }

  /**
   * !消息派发的主要逻辑
   * todo 如果消息没有target 默认target为 main
   * @description 为每条消息带上popSource
   * @param {IPostMessageSyntax<T>} msg
   * @param {?Window} target
   * @param {boolean} isPost
   * @returns {Promise<IPostMessageSyntax<T>>}
   */
  send (target, data, isPost) {
    const msg = isPost ? data.data : data
    if (msg.sourceCode === undefined) {
      msg.sourceCode = this.appCode
    }
    if (msg.pop === undefined) {
      if (msg.target !== 'parent') {
        msg.pop = true
      } else {
        msg.pop = false
      }
    }

    //todo 如果target不存在于当前Map则向全局发送消息
    if (!target) {
      const parent = window.parent !== window ? [window.parent] : []
      const sibling = []
      microAppMap.forEach((value, key) => {
        sibling.push(value.contentWindow)
      })
      return Promise.all(
        parent
          .concat(sibling)
          .map(tar =>
            isPost ? super.post(target, data) : super.send(target, data)
          )
      )
    } else {
      // todo如果target是'main'则直接向上传递消息；
      return isPost ? super.post(target, data) : super.send(target, data)
    }
  }
  /**
   * todo 响应自己的消息，如果不是自己的消息则传递消息
   * @description 监听消息，并在自动取消监听
   * @param {IGenericFunction<IMessage<IPostMessageSyntax<*>>,void>} cb 监听到消息的回调函数
   * @param { Vue.Component } context 组件上下文
   * @returns {cancelCallback} 取消监听的回调函数
   */
  on (cb) {
    return super.on(res => {
      // todo 如果消息的目标是当前目标或者为'parent'，则直接响应消息
      if (res.data.target === this.appCode || res.data.target === 'global') {
        debugger
        cb(res)
      }
    })
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
        type: 'register',
        sourceCode: this.appCode,
        pop: false
      })
    }
    // todo 维护子应用注册表
    this.__maintainCancel = this.on(res => {
      const msg = res.data
      const microAppCode = msg.sourceCode
      if (msg.type === 'register' && msg.target === 'parent') {
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
   * @description 注册子应用
   * @param {string} appCode 子应用Code
   * @param {HTMLIFrameElement} target 子应用Iframe元素
   */
  registerApp (appCode, target) {
    if (microAppMap.has(appCode)) return
    microAppMap.set(appCode, target)
    microAppElMap.set(target, appCode)
    console.log('registerApp---------------', appCode, microAppMap)
  }
  /**
   * @description 取消注册子应用
   * @param {string} appCode 子应用Code
   */
  unRegisterApp (appCode) {
    console.log('unRegisterApp---------------', appCode, microAppMap)
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
      const tar = microAppMap.get(target)
      if (tar) res = [target, tar]
    }
    console.log('getApp---------------------', target, res, microAppMap)
    if (!res) console.warn('getApp missing,target named:', target, microAppMap)
    return res
  }
  /**
   * @description 销毁实例，取消事件监听
   */
  destory () {
    this.__maintainCancel()
    this.__pageHideCancel()
  }

  /**
   * @param {microAppCode} microAppCode
   * @returns {object | undefined}
   */
  getState (microAppCode) {
    return stateMap.get(microAppCode)
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
   * @description 全局配置响应
   * @param {Channel} context
   */
  _configResponse () {
    return this.on(res => {
      const msg = res.data
      if (msg.target === 'main' && msg.type === 'config') {
        if (msg.target === this.appCode) {
          msg.data = window[DEFAULT_GLOBAL_CONFIG]
          msg.target = msg.sourceCode
          msg.sourceCode = this.appCode
          msg.pop = false //从主应用向下发消息，禁止冒泡
          this.send(this.getApp(msg.sourceCode)?.[1].contentWindow, msg)
        }
      }
    })
  }

  /**
   * @description 消息传递
   * @returns
   */
  _onPassive () {
    return super.on(res => {
      const msg = res.data
      // todo 传递消息
      // todo main
      if (msg.target === main && window.parent !== window) {
      }
      if (
        (msg.target !== 'parent' && msg.target !== this.appCode) ||
        msg.target === 'global'
      ) {
        if (this.appCode === 'main') msg.pop = false

        // todo 如果是main,则向上传递；如果不是，则全局传递
        microAppMap.forEach((tar, tarCode) => {
          if (tarCode !== msg.sourceCode) {
            this.send(tar.contentWindow, msg)
          }
        })
        if (window.parent !== window && msg.pop === true) {
          this.send(window.parent, msg)
        }
      }
    })
  }

  /**
   * @description 响应onStaet第一次请求数据
   * @param {Channel} context
   */
  _stateResponse () {
    return super.on(res => {
      const msg = res.data
      if (msg.target === 'parent' && msg.type === 'state') {
        const tarLike = this.getApp(msg.sourceCode)
        if (tarLike) {
          msg.data = stateMap.get(msg.sourceCode)
          this.send(tarLike[1].contentWindow, msg)
        }
      }
    })
  }
  /**
   *
   * @param {Channel} instance
   */
  register (connector) {
    if (window.parent !== window) {
      // TODO 获取子应用AppCode
      /**@type ParamsType */
      const params = getParams(window.location)
      // ! 子应用
      connector.setAppCode(params.microAppCode)
    } else {
      // ! 主应用
      connector.setAppCode('main')
    }
  }
}
