import { Channel } from './core/Channel'
import { SUPPORT_MESSAGE_TYPE } from './core/Channel.default'
import { v4 as uuidv4 } from 'uuid'
import { isObject } from './util'

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
  constructor (target, options) {
    super(target, options)
  }
  /**
   * @description 处理多条件参数
   * @param {IPostMessageSyntax<T> & {target:HTMLIFrameElement} | IMessage<IPostMessageSyntax<T>>} msg
   * @param {boolean} isPost
   * @returns {Promise<IPostMessageSyntax<T>>}
   */
  $send (data, isPost) {
    let target
    const msg = isPost ? data.data : data
    if (!msg.target || !msg.type) throw Error('message syntax error')
    const msgTarget = msg.target
    //todo main parent发送
    if (
      (msgTarget === 'main' || msgTarget === 'parent') &&
      window.parent !== window
    ) {
      target = window.parent
      return isPost ? super.post(target, data) : super.send(target, data)
    }
    // todo如果target是HTMLIFrameElement
    // todo直接发送消息，且将target自动替换为对应的appCode
    const targetLike = this.getApp(msgTarget)
    if (msgTarget instanceof HTMLIFrameElement && targetLike) {
      msg.target = targetLike[0]
      target = msgTarget.contentWindow
    }
    //todo 如果target是appCode则在map中找到对的HTMLIFrameElement
    if (typeof msgTarget === 'string' && targetLike) {
      /**@type HTMLIFrameElement */
      const tar = targetLike[1]
      target = tar.contentWindow
    }
    if (!target) console.warn('current layer target not exist', data)
    return isPost ? super.post(target, data) : super.send(target, data)
  }
  /**
   * @param {Vue.Component} context
   * @param {PostMessageType | IGenericFunction<{data:IMessage<IPostMessageSyntax<IUserData>>,responser:function},any>} type
   * @param {IGenericFunction<IPostMessageSyntax<IUserData>,any> | IGenericFunction<IUserData,any>} cb
   */
  $on (context, type, cb) {
    let onCancel
    if (!(typeof type === 'string' || typeof type === 'function')) {
      throw Error('type parma type error')
    }
    if (context) {
      context.$on('hook:beforeDestory', () => {
        onCancel?.()
      })
    }
    if (typeof type === 'function') {
      onCancel = super.on(msg => {
        const responser = this.getResponse(msg)
        type({ data: msg.data.data, responser })
      })
      return onCancel
    } else {
      onCancel = super.on(msg => {
        if (msg.data.type === type) {
          const responser = this.getResponse(msg)
          cb({ data: msg.data.data, responser })
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
    const onCancel = this.on(data => {
      const msg = data.data
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
  getConfig (config) {
    const { timeout = 3000 } = config
    let sendOk = false
    return new Promise((resolve, reject) => {
      const id = uuidv4()
      this.$send({
        target: 'main',
        type: 'config',
        id: id
      })
      const cancel = this.$on(undefined, ({ data }) => {
        const msg = data.data
        if (isObject(msg) && msg.id === id) {
          cancel()
          sendOk = true
          resolve(msg.data)
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
   * @description 发送配置，只能以code方式发送，为了避免子应用未注册造成的消息丢失
   * @param {string} microAppCode
   * @param {object} state
   */
  sendState (microAppCode, state) {
    this.setState(microAppCode, state)
    return this.$send({
      target: microAppCode,
      type: 'state',
      data: state
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
    this.$send({
      target: 'parent',
      type: 'state'
    }).then(res => cb(res.data))
    return this.$on(context, ({ data }) => {
      const msg = data.data
      if (msg.type === 'state') {
        cb(msg.data)
      }
    })
  }
  /**
   *
   * @param {IMessage<IPostMessageSyntax<*>>} msg
   * @returns {IGenericFunction<IMessage<IPostMessageSyntax<*>>,IMessage<IPostMessageSyntax<*>>>}
   */
  getResponse (msg) {
    return data => {
      data.data.target = data.data.sourceCode
      data.data.sourceCode = this.appCode
      return this.$send(Object.assign({ data: data }, msg), true)
    }
  }
}
