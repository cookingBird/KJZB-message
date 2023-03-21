import { Channel, stateMap } from './core/Channel'
import { v4 as uuidv4 } from 'uuid'
import { isObject, getParams } from './util'

/**
 * @class ApplicationChannel
 */
export class ApplicationChannel extends Channel {
  /**
   * @description 新建一个目标连接频道
   * @constructor
   * @param { window | windowContent} target 目标上下文
   * @param {ChannelOpts} options 其它参数
   */
  constructor (target, options = {}) {
    super(target, options)
    this.DEFAULT_GLOBAL_CONFIG = options.configField || 'URL_CONFIG'
    this._statePersistence()
  }
  /**
   * @description 处理多条件参数
   * @param {IPostMessageSyntax<*> | (IPostMessageSyntax<*> & IMessage<*>)} msg
   * @returns {Promise<IPostMessageSyntax<*> & IMessage<*>>}
   */
  $send (msg) {
    let target
    if (!msg.target || !msg.type) throw Error('message syntax error')
    //todo main parent发送
    if (msg.target === 'main' || msg.target === 'parent') {
      if (window.parent === window && msg.target === 'main') {
        throw Error('can not send message to myself')
      }
      return super.send(window.parent, msg)
    } else {
      if (msg.type === 'setState') {
        stateMap.set(msg.target, msg.data)
      }
      const targetEl = this.getApp(msg.target)
      if (!targetEl) {
        console.warn(
          `current layer target not exist target named ${msg.target}`
        )
      } else {
        target = targetEl.contentWindow
      }
      return super.send(target, msg)
    }
  }
  /**
   * @param {Vue.Component} context
   * @param {PostMessageType | IGenericFunction<{data:IMessage<IPostMessageSyntax<IUserData>>,responser:function},any>} type
   * @param {IGenericFunction<IPostMessageSyntax<IUserData>,any> | IGenericFunction<IUserData,any>} cb
   */
  $on (context, type, cb) {
    let onCancel
    if (cb && typeof cb !== 'function') {
      throw Error(`$on callback param error,current type is ${typeof cb}`)
    }
    if (typeof type !== 'string' && typeof type !== 'function') {
      throw Error('type parma type error')
    }
    if (context) {
      context.$on('hook:beforeDestory', () => {
        onCancel?.()
      })
    }
    if (typeof type === 'function') {
      onCancel = super.on(msg => {
        const responser = this._getResponse(msg)
        type({ data: msg, responser, rawData: msg })
      })
      return onCancel
    } else {
      onCancel = super.on(msg => {
        if (msg.type === type) {
          const responser = this._getResponse(msg)
          cb({ data: msg.data, responser, rawData: msg })
        }
      })
    }
    return onCancel
  }

  /**
   * @description 发送回调消息
   * @param { string } target 目标应用CODE
   * @param { function } cb 回调函数
   * @param { object | null} params 回调函数参数
   * @returns { promise }
   */
  sendCallback (target, cb, params) {
    if (typeof cb !== 'function' || params === undefined) {
      throw Error('callback or params type error')
    }
    if (!target) {
      throw Error('missing target')
    }
    return this.$send({
      type: 'callback',
      target: target,
      data: {
        callback: cb.toString(),
        params: params
      }
    })
  }
  /**
   * @description 接收消息
   * @param {IGenericFunction<Function,any>} cb 接收消息的回调函数
   * @param { Vue.Component } context 组件上下文
   * @returns {cancelCallback} 取消回调的函数
   */
  onCallback (context, cb) {
    if (typeof cb !== 'function') {
      throw Error(
        `onCallback callback param error,current type is ${typeof cb}`
      )
    }
    const onCancel = this.$on(null, ({ data, responser }) => {
      const msg = data
      if (msg.type === 'callback') {
        const data = msg.data
        if (data.params !== null) {
          const paramsName = Object.keys(data.params)
          const paramsValue = Object.values(data.params)
          const func = Function(
            ...paramsName,
            `(${data.callback})(${paramsName.join(',')})`
          )
          cb({
            exec: function (ctx) {
              func.apply(ctx, paramsValue)
            },
            responser
          })
        } else {
          const func = Function(`(${data.callback})()`)
          cb({
            exec: function (ctx) {
              func.apply(ctx)
            },
            responser
          })
        }
      }
    })
    if (context) {
      context.$on('hook:beforeDestory', onCancel)
    }
    return onCancel
  }

  /**
   * @description 获取主应用全局配置
   * @returns {Promise<object>}
   */
  getConfig (options = {}) {
    const { timeout = 3 * 1000 } = options
    let sendOk = false
    return new Promise((resolve, reject) => {
      const id = uuidv4()
      this.$send({
        target: 'main',
        type: 'config',
        id: id
      })
      const cancel = this.$on(undefined, ({ data }) => {
        if (isObject(data) && data.id === id) {
          cancel()
          sendOk = true
          resolve(data.data)
        }
      })
      setTimeout(() => {
        if (!sendOk) {
          reject('getConfig error')
          cancel()
        }
      }, timeout)
    })
  }

  /**
   * @description 接收消息 T为消息的具体格式
   * @template T
   * @param {IGenericFunction<T,any>} cb 接收消息的回调函数
   * @param { Vue.Component } context 组件上下文
   * @returns {cancelCallback} 取消回调的函数
   */
  onState (context, cb) {
    if (typeof cb !== 'function') {
      throw Error(`onState callback param error,current type is ${typeof cb}`)
    }
    this.$send({
      target: 'parent',
      type: 'getState'
    }).then(res => {
      cb(res.data)
    })
    return this.$on(context, ({ data }) => {
      if (data.type === 'setState') {
        cb(data.data)
      }
    })
  }
  /**
   * @param {IMessage<*>&IPostMessageSyntax<*>} msg
   * @returns {IGenericFunction<IMessage<IPostMessageSyntax<*>>,IMessage<IPostMessageSyntax<*>>>}
   */
  _getResponse (msg) {
    return data => {
      msg.target = msg.sourceCode
      msg.sourceCode = this.appCode
      msg.popSource = this.appCode
      return this.$send(Object.assign(msg, { data: data }))
    }
  }
  /**
   * @description main
   * @param {Channel} instance
   */
  applicationBootstrap () {
    if (window.parent !== window) {
      // TODO 获取子应用AppCode
      /**@type ParamsType */
      const params = getParams(window.location)
      // ! 子应用
      this.setAppCode(params.microAppCode)
    } else {
      // ! 主应用
      this.setAppCode('main')
    }
  }
  /**
   * @description AppCode
   * @returns {string} microAppCode
   */
  getMicroAppCode () {
    return this.appCode
  }
  /**
   *
   * @param {string} key
   */
  setGlobalConfigField (key) {
    if (key) this.DEFAULT_GLOBAL_CONFIG = key
  }
  _statePersistence () {
    this.$on(null, 'getState', ({ responser, rawData }) => {
      const state = stateMap.get(rawData.sourceCode)
      if (state) responser(state)
    })
  }
}
