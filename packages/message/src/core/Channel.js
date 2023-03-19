import { Message } from './Message'
import { isObject, getParams } from '../util'
import { DEFAULT_GLOBAL_CONFIG } from './Channel.default'

/**@type {Map<microAppCode,microAppContext>} */
const microAppMap = new Map()

/**
 * @typedef {Map<microAppContext,object>} IStateMap
 * @description 组件状态Map
 * @type {IStateMap}
 */
const stateMap = new Map()

export { microAppMap, stateMap }
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
    //*消息转发
    this._passive()
    //*维护注册表
    this._maintainRegister()
  }

  /**
   * !消息派发的主要逻辑
   * todo 如果消息没有target 默认target为 main
   * @description 为每条消息带上popSource
   * @param {?Window} target
   * @param {(IMessage<*>&IPostMessageSyntax<*>) | IPostMessageSyntax<*>} msg
   * @returns {Promise<IPostMessageSyntax<T>>}
   */
  send (target, msg) {
    msg.sourceCode =
      msg.sourceCode === undefined ? this.appCode : msg.sourceCode
    msg.pop = msg.pop === undefined ? true : msg.pop

    if (target) {
      return super.__send(target, msg)
    } else {
      //todo 如果target不存在，则向全局发送消息
      const sendTargets = []
      if (window.parent !== window && msg.pop === true) {
        super.__send(window.parent, msg)
      }
      microAppMap.forEach((value, key) => {
        const data = msg
        data.pop = false
        super.__send(value.contentWindow, data)
      })
      return Promise.resolve(undefined)
    }
  }
  /**
   * todo 响应自己的消息，如果不是自己的消息则传递消息
   * @description 监听消息，并在自动取消监听
   * @param {IGenericFunction<IMessage<*>&IPostMessageSyntax<*>,void>} cb 监听到消息的回调函数
   * @param { Vue.Component } context 组件上下文
   * @returns {cancelCallback} 取消监听的回调函数
   */
  on (cb) {
    return super.__on(res => {
      // todo 如果消息的目标是当前目标或者为'parent'，则直接响应消息
      if (
        res.target === this.appCode ||
        res.target === 'global' ||
        res.target === 'parent'
      ) {
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
    // todo 自动向父级注册
    if (window.parent !== window) {
      this.send(window.parent, {
        target: 'parent',
        type: 'register',
        sourceCode: this.appCode,
        pop: false
      })
    }
  }

  /**
   * @description 取消注册子应用
   * @param {string} appCode 子应用Code
   */
  unRegisterApp (appCode) {
    return microAppMap.delete(appCode)
  }
  /**
   * @typedef {[string,HTMLIFrameElement] } targetLike
   * @param {targetLike | undefined} target
   */
  getApp (target) {
    return microAppMap.get(target)
  }
  /**
   * @description 注册子应用
   * @param {string} appCode 子应用Code
   * @param {HTMLIFrameElement} target 子应用Iframe元素
   */
  registerApp (appCode, target) {
    microAppMap.set(appCode, target)
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
   * @description 消息传递
   * @returns
   */
  _passive () {
    return super.__on(msg => {
      // todo 传递消息
      if (
        msg.target !== this.appCode &&
        msg.target !== 'parent' &&
        msg.type !== 'state'
      ) {
        // todo main
        if (msg.target === 'main' && window.parent !== window) {
          this.send(window.parent, msg)
          return
        }
        if (msg.target === 'global' || msg.target !== this.appCode) {
          //! 如果传递到根节点还未找到
          if (this.appCode === 'main') msg.pop = false
          // todo sibling
          microAppMap.forEach((tar, tarCode) => {
            if (tarCode !== msg.sourceCode) {
              this.send(tar.contentWindow, Object.assign(msg, { pop: false }))
            }
          })
          //todo parent
          if (window.parent !== window && msg.pop === true) {
            this.send(window.parent, Object.assign(msg, { pop: true }))
          }
        }
      }
    })
  }
  /**
   * @description 默认注册事件
   * @returns
   */
  _maintainRegister () {
    return this.on(msg => {
      const microAppCode = msg.sourceCode
      if (msg.type === 'register' && msg.target === 'parent') {
        //todo 注册
        const el = document.getElementById('gislife-' + microAppCode)
        if (el) {
          this.registerApp(microAppCode, el)
        } else {
          throw Error(
            `register error, can not find element named ${microAppCode}}`
          )
        }
      }
    })
  }
}
