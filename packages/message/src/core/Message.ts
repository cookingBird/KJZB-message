import { v4 as uuidv4 } from 'uuid'
import { onMessage, isObject } from '../util'
import { globalConfig, type GlobalConfig } from '..';

export type BaseMsg = {
  id: string;
  belong: string;
  timeout: number;
  [index: string]: any;
};
export type MessageOps = {
  targetOrigin: string;
  timeout: number;
  namespace: string;
  rejectMissing: boolean;
}
/**
 * @description Message类只提供发送消息和接受消息的方法，只确保发送的消息属于当前命名空间
 */
export class Message {
  protected appCode: string;
  protected targetOrigin: string;
  protected timeout: number;
  protected belong: string;
  protected rejectMissing: boolean;
  protected hooks: GlobalConfig['hooks'];
  public globalContext: Window;
  constructor(options: Partial<MessageOps> = {}) {
    this.appCode = window.parent === window ? 'main' : '';
    this.targetOrigin = options.targetOrigin ?? '*';
    this.timeout = options.timeout ?? 3 * 1000;
    this.belong = options.namespace ?? 'gislife';
    this.rejectMissing = options.rejectMissing ?? true;
    this.hooks = globalConfig.hooks;
    this.globalContext = this.hooks.getContext.call(undefined);
  }
  /**
   * @description 发送消息
   */
  private _postMessage<R = any>(msg: Partial<BaseMsg>, target: Window): Promise<R> {
    const timeout = msg.timeout ?? this.timeout
    let isSendOK = false

    if(!target) {
      throw Error(`
        _postmessage target not exist, named ${msg.target},
        message type is ${msg.type}, 
        source is ${this.appCode}`
      )
    };
    if(!msg) {
      throw Error(`_postmessage msg not exist;`)
    };
    const sendMsg = JSON.parse(JSON.stringify(msg)) as Partial<BaseMsg>;
    sendMsg.belong = sendMsg.belong ?? this.belong;
    sendMsg.id = sendMsg.id ?? uuidv4();
    return new Promise((resolve, reject) => {
      try {
        target.postMessage(sendMsg, '*');
      } catch(error) {
        console.error(
          `postMessage error, 
              msg type is ${msg.type},
              target is ${msg.target},
              sourceCode is ${msg.sourceCode}\n`,
          msg.data,
          error
        )
      }
      const cancel = this.__on(data => {
        if(isObject(data) && data.id === sendMsg.id && data.belong === sendMsg.belong) {
          isSendOK = true
          cancel()
          resolve(data.data)
        }
      })
      setTimeout(() => {
        if(!isSendOK) {
          cancel()
          if(this.rejectMissing) {
            reject()
          }
        }
      }, timeout)
    })
  }

  /**
   * @description 发送消息
   */
  protected __send<T = any>(target: Window, msg: Partial<BaseMsg>) {
    console.log(`${this.appCode} before send message--------------------`, msg);
    return this._postMessage<T>(msg, target)
  }
  /**
   * @description 监听消息 只监听当前命名空间的消息,且非回复消息
   */
  protected __on(cb: (msg: BaseMsg) => void) {
    return onMessage(event => {
      if(isObject(event.data) && event.data.belong === this.belong) {
        console.log(`${this.appCode} before on message---------------`, event.data);
        cb(event.data)
      }
    })
  }
}
