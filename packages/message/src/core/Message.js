import { v4 as uuidv4 } from 'uuid'
import { ChainRunner, onMessage, isObject, toObj } from '../util'

/**
 * @class
 */
export class Message {
  /**
   * @description 初始化一个Channel
   * @constructor
   * @param {Window | WindowContent} targetWindow
   * @param {MessageOpts} options Channel初始化options
   */
  constructor (targetWindow, options = {}) {
    this.appCode = ''
    this.targetOrigin = options.targetOrigin || '*'
    this.timeout = options.timeout || 3 * 1000
    this.tag = options.namespace || 'gislife'
    /**@description 请求拦截器 */
    /**@type ChainRunner<IPostMessageSyntax<*>> */
    this.requestInterceptor = new ChainRunner()
  }
  /**
   * todo 包裹原生消息发生函数，保证消息唯一性,局部性;
   * @description 发送消息
   * @param {IPostMessageSyntax<T>} msg
   * @param {HTMLIFrameElement.contentWindow} target
   * @returns { Promise<IMessage<IPostMessageSyntax<T>>> }
   */
  _postMessage (msg, target) {
    const timeout = msg.timeout || this.timeout
    const response = msg.response || true
    let isSendOK = false
    if (target) {
      const id = uuidv4()
      return new Promise((resolve, reject) => {
        /** @type IPostMessageSyntax<*> */
        const res = this.requestInterceptor.run(msg)
        const sendRes = {
          id,
          data: res,
          belong: this.tag
        }
        console.log('before send', this.appCode, '--------------', sendRes)
        target.postMessage(sendRes, '*')
        const cancel = this.on(data => {
          if (isObject(data) && data.id === id && data.belong === this.tag) {
            isSendOK = true
            cancel()
            resolve(data.data)
          }
        })
        setTimeout(() => {
          if (!isSendOK && response) {
            cancel()
            reject('message missing response or response timeout !!!!!!!')
          }
        }, timeout)
      })
    } else {
      return Promise.reject('missing target')
    }
  }

  /**
   * todo 发送消息
   * @description 发送消息
   * @param {Window} target
   * @param {IPostMessageSyntax<T>} msg 消息体
   * @returns { Promise<T> } 确认消息发送成功的回调
   */
  send (target, msg) {
    return this._postMessage(msg, target).then(
      res => {
        return res
      },
      err => {
        return Promise.reject(err)
      }
    )
  }
  /**
   * todo 包裹原生消息发生函数，保证消息唯一性,局部性;
   * @description 发送消息
   * @param {IMessage<IPostMessageSyntax<T>>} msg
   * @param {HTMLIFrameElement.contentWindow} target
   * @returns { Promise<IMessage<IPostMessageSyntax<T>>> }
   */
  post (target, msg) {
    const timeout = msg.data.timeout || this.timeout
    const response = msg.data.response || true
    let isSendOK = false
    if (target) {
      return new Promise((resolve, reject) => {
        console.log(
          'before post-------',
          this.appCode,
          '--------------',
          sendRes
        )
        target.postMessage(msg, '*')
        const cancel = this.on(data => {
          if (isObject(data) && data.id === id && data.belong === this.tag) {
            isSendOK = true
            cancel()
            resolve(data.data)
          }
        })
        setTimeout(() => {
          if (!isSendOK && response) {
            cancel()
            reject('message missing response or response timeout !!!!!!!')
          }
        }, timeout)
      })
    } else {
      return Promise.reject('missing target')
    }
  }
  /**
   * @description 监听消息 只监听当前命名空间的消息,且非回复消息
   * @param {IGenericFunction<IMessage<IPostMessageSyntax<*>>,void>} cb 接收到消息的回调函数
   * @returns {cancelCallback} 取消监听事件的函数
   */
  on (cb) {
    return onMessage(event => {
      if (isObject(event.data) && event.data.belong === this.tag) {
        console.log(
          'before on---',
          this.appCode,
          '-----------------',
          event.data
        )
        cb(event.data)
      }
    })
  }
}
