import { v4 as uuidv4 } from 'uuid'
import { onMessage, isObject } from '../util'
import { globalConfig, type GlobalConfig } from '..';
import { debounce } from '../util'

export type BaseMsg = {
  id: string;
  belong: string;
  timeout: number;
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
  protected appCode: string = undefined as unknown as string;
  protected targetOrigin: string;
  protected timeout: number;
  protected belong: string;
  protected rejectMissing: boolean;
  protected hooks: GlobalConfig['hooks'];
  protected globalContext: Window;


  constructor(options: Partial<MessageOps> = {}) {
    this.targetOrigin = options.targetOrigin ?? '*';
    this.timeout = options.timeout ?? 3 * 1000;
    this.belong = options.namespace ?? 'gislife';
    this.rejectMissing = options.rejectMissing ?? true;
    this.hooks = globalConfig.hooks;
    this.globalContext = this.hooks.getContext.call(undefined as any);
  }
  /**
   * @description 发送消息
   */
  private _postMessage<R = any>(msg: Partial<BaseMsg>, target: Window): Promise<R> {
    const timeout = msg.timeout ?? this.timeout
    let isSendOK = false
    if(!target) {
      throw Error(`postmessage target not exist`)
    };
    if(!msg) {
      throw Error(`postmessage msg not exist;`)
    };
    const sendMsg = { ...msg } as Partial<BaseMsg>;
    sendMsg.belong = sendMsg.belong ?? this.belong;
    sendMsg.id = sendMsg.id ?? uuidv4();
    return new Promise((resolve, reject) => {
      try {
        target.postMessage(sendMsg, '*');
      } catch(error) {
        console.error(`postMessage error`, JSON.stringify(msg), error)
      }
      const onResolve = debounce((data) => { resolve(data); cancel(); }, 300)
      const cancel = this.__on(msg => {
        if(isObject(msg) && msg.id === sendMsg.id && msg.belong === sendMsg.belong) {
          console.log('receive msg', msg);
          isSendOK = true
          // @ts-expect-error
          onResolve(msg.data)
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
  protected __send<R = any>(target: Window, msg: Partial<BaseMsg>) {
    // console.log(`%c ${this.appCode} before send message：${JSON.stringify(msg)}`, 'color:red');
    return this._postMessage<R>(msg, target)
  }
  /**
   * @description 监听消息 只监听当前命名空间的消息,且非回复消息
   */
  protected __on<T extends BaseMsg = BaseMsg>(cb: (msg: T) => void) {
    return onMessage(event => {
      if(isObject(event.data) && event.data.belong === this.belong) {
        console.log(`%c ${this.appCode} before on message： ${JSON.stringify(event.data)}`, 'color:red');
        cb(JSON.parse(JSON.stringify(event.data)))
      }
    })
  }
}
