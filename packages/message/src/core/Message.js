import { v4 as uuidv4 } from 'uuid'
import { ChainRunner, onMessage, isObject, toObj } from '../util'

/**
 * @description Message类只提供发送消息和接受消息的方法，只确保发送的消息属于当前命名空间
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
    this.belong = options.namespace || 'gislife'
    /**@description 请求拦截器 */
    /**@type ChainRunner<IPostMessageSyntax<*>> */
    this.requestInterceptor = new ChainRunner()
  }
  /**
   * todo 包裹原生消息发生函数，保证消息唯一性,局部性;
   * @description 发送消息
   * @param {(IMessage<*>&IPostMessageSyntax<*>) | IPostMessageSyntax<*>} msg
   * @param {HTMLIFrameElement.contentWindow} target
   * @returns { Promise<IMessage<*> & IPostMessageSyntax<*>> }
   */
  _postMessage (msg, target) {
    const timeout = msg.timeout || this.timeout
    let isSendOK = false
    const id = uuidv4()
    if (target) {
      let sendRes
      if (msg && msg.id && msg.belong) {
        sendRes = msg
      } else {
        /** @type IPostMessageSyntax<*> */
        const res = this.requestInterceptor.run(msg)
        sendRes = Object.assign({ id, belong: this.belong }, res)
      }
      return new Promise((resolve, reject) => {
        console.log(
          `_postmessage from ${this.appCode} to ${sendRes.target}`,
          sendRes
        )
        target.postMessage(sendRes, '*')
        const cancel = this.__on(data => {
          if (isObject(data) && data.id === id && data.belong === this.belong) {
            isSendOK = true
            cancel()
            console.log('______________postMessage callback', data)
            resolve(data)
          }
        })
        setTimeout(() => {
          if (!isSendOK) {
            cancel()
            console.warn('message missing response or response timeout !!!!!!!')
            reject(msg)
          }
        }, timeout)
      })
    } else {
      throw Error(
        `_postmessage target not exist named ${
          msg.target || msg.data.target
        }, message type is ${msg.type}, source is ${this.appCode}`
      )
    }
  }

  /**
   * todo 发送消息
   * @description 发送消息
   * @param {Window} target
   * @param {(IMessage<*>&IPostMessageSyntax<*>) | IPostMessageSyntax<*>} msg 消息体
   * @returns { Promise<IMessage<*> & IPostMessageSyntax<*>> } 回复的消息
   */
  __send (target, msg) {
    return this._postMessage(msg, target).then(
      res => {
        console.log('______________send callback', res)
        return res
      },
      err => {
        return Promise.reject(err)
      }
    )
  }
  /**
   * @description 监听消息 只监听当前命名空间的消息,且非回复消息
   * @param {IGenericFunction<IMessage<*>&IPostMessageSyntax<*>,void>} cb 接收到消息的回调函数
   * @returns {cancelCallback} 取消监听事件的函数
   */
  __on (cb) {
    return onMessage(event => {
      if (isObject(event.data) && event.data.belong === this.belong) {
        console.warn(
          `before on from ${event.data.sourceCode} to ${event.data.target},current is ${this.appCode}`,
          event.data
        )
        cb(event.data)
      }
    })
  }
}
