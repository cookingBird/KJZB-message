import { Channel, stateMap } from './core'
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
  constructor(target, options = {}) {
    super(target, options)
    /**@private */
    this.DEFAULT_GLOBAL_CONFIG = options.configField || 'URL_CONFIG'
    this._statePersistence()
  }
  /**
   * @description 发送消息
   * @template T
   * @template R
   * @param {IMessage<T>} msg
   * @returns {Promise<R>}
   */
  $send(msg) {
    let target
    if (!msg.target || !msg.type) throw Error('message syntax error')
    //todo main parent发送
    if (msg.target === 'main' || msg.target === 'parent') {
      if (window.parent === window && msg.target === 'main') {
        console.warn('can not send message to myself')
        return
      }
      return super.send(window.parent, msg)
    } else {
      if (msg.type === 'setState') {
        //* cache state
        stateMap.set(msg.target, msg.data);
      }
      const targetEl = this.getApp(msg.target)
      if (!targetEl) {
        console.warn(
          `current layer target not exist target named ${ msg.target }`
        )
      } else {
        target = targetEl.contentWindow
      }
      return super.send(target, msg)
    }
  }


  /**
   * @description 监听消息
   * @template D
   * @param {string | IGenericFunction<{data:D, responser:function, msg: IMessage<D>&IPostMessageSyntax }, void>} type 消息类型
   * @param {IGenericFunction<{data:D, responser:function, msg: IMessage<D>&IPostMessageSyntax }, void>} [cb] 回调函数
   * @return {cancelCallback} 取消监听的回调 
   */
  $on(type, cb) {
    let onCancel
    if (cb && typeof cb !== 'function') {
      throw Error(`$on callback param error,current type is ${ typeof cb }`)
    }
    if (typeof type !== 'string' && typeof type !== 'function') {
      throw Error('type parma type error')
    }
    if (typeof type === 'function') {
      onCancel = super.on(msg => {
        const responser = this._getResponse(msg)
        type({ data: msg, responser, msg: msg })
      })
      return onCancel
    } else {
      onCancel = super.on(msg => {
        if (msg.type === type) {
          const responser = this._getResponse(msg)
          cb({ data: msg.data, responser, msg: msg })
        }
      })
    }
    return onCancel
  }

  /**
   * 
   * @param {string} emitAndTar 
   * @param {object} data 
   */
  $emit(emitAndTar, data) {
    if (!emitAndTar) {
      throw Error('emit is empty')
    }
    const target = emitAndTar.split(":")[1] || 'parent';
    const emitType = emitAndTar.split(":")[0];
    this.$send({
      target,
      type: emitType,
      data: data
    })
  }

  /**
   * @description 发送回调消息
   * @param { string } target 目标应用CODE
   * @param { function } cb 回调函数
   * @param { object | null} params 回调函数参数
   * @returns { promise }
   */
  sendCallback(target, cb, params) {
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
   * @returns {cancelCallback} 取消回调的函数
   */
  onCallback(cb) {
    if (typeof cb !== 'function') {
      throw Error(
        `onCallback callback param error,current type is ${ typeof cb }`
      )
    }
    const onCancel = this.$on(null, ({ msg, responser }) => {
      if (msg.type === 'callback') {
        const data = msg.data
        if (data.params !== null) {
          const paramsName = Object.keys(data.params)
          const paramsValue = Object.values(data.params)
          const func = Function(
            ...paramsName,
            `(${ data.callback })(${ paramsName.join(',') })`
          )
          cb({
            exec: function(ctx) {
              func.apply(ctx, paramsValue)
            },
            responser: responser
          })
        } else {
          const func = Function(`(${ data.callback })()`)
          cb({
            exec: function(ctx) {
              func.apply(ctx)
            },
            responser: responser
          })
        }
      }
    })
    return onCancel
  }

  /**
   * @description 获取主应用全局配置
   * @returns {Promise<object>}
   */
  getConfig(options = {}) {
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
   * @returns {cancelCallback} 取消回调的函数
   */
  onState(cb) {
    if (typeof cb !== 'function') {
      throw Error(`onState callback param error,current type is ${ typeof cb }`)
    }
    this.$send({
      target: 'parent',
      type: 'getState'
    }).then(cb)
    return this.$on(({ msg }) => {
      if (msg.type === 'setState') {
        cb(msg.data)
      }
    })
  }

  /**
   * @description main
   * @param {Channel} instance
   */
  applicationBootstrap() {
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
    this._onConfig()
  }
  /**
   * @description AppCode
   * @returns {string} microAppCode
   */
  getMicroAppCode() {
    return this.appCode
  }

  /**
   * @description 是否是主应用
   * @returns {boolean}
   */
  isMain() {
    return this.appCode === 'main'
  }

}
