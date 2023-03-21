import { v4 as uuidv4 } from 'uuid'
import { onMessage, isObject, toObj } from '../util'

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
      if (msg && msg.id) {
        sendRes = Object.assign(msg, { belong: this.belong })
      } else {
        sendRes = Object.assign({ id, belong: this.belong }, msg)
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
            resolve(data)
          }
        })
        setTimeout(() => {
          if (!isSendOK) {
            console.warn('message missing response or response timeout !!!!!!!')
            cancel()
            reject()
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
    return this._postMessage(msg, target)
  }
  /**
   * @description 监听消息 只监听当前命名空间的消息,且非回复消息
   * @param {IGenericFunction<IMessage<*>&IPostMessageSyntax<*>,void>} cb 接收到消息的回调函数
   * @returns {cancelCallback} 取消监听事件的函数
   */
  __on (cb) {
    return onMessage(event => {
      if (isObject(event.data) && event.data.belong === this.belong) {
        console.log(
          `>>>>>>>>>>>>>>>>>>>>>>>>>>\non message from ${event.data.sourceCode},pop by ${event.data.popSource} current is ${this.appCode}\n`,
          event.data
        )
        cb(event.data)
      }
    })
  }
}
