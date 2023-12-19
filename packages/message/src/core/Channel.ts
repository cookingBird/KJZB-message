import { Message } from './Message'
import type { BaseMsg } from './Message'
import { globalConfig } from '..';
import type { DataMsg } from '@/ApplicationChannel';

export type PassiveMsg = {
  target: string;
  sourceCode?: string;
  popSource?: string;
  pop?: boolean;
} & Partial<BaseMsg>;




/**@description app map */
export const microAppMap = new Map<string, HTMLIFrameElement>()

/**
 * @description state map
 */
const stateMap = new WeakMap<HTMLIFrameElement, any>()

/**
 * @class Channel
 */
export class Channel extends Message {
  constructor(options = {}) {
    super(options)
    //*消息转发
    this._passive()
    //*维护注册表
    this._maintainRegister()
  }

  /**
   * @description send or passive message
   */
  protected send<R = any>(target: Window | undefined | null, msg: PassiveMsg): Promise<R> {
    const newMsg = {
      ...msg,
      sourceCode: this.appCode,
      popSource: this.appCode,
    }
    // target exist current page context
    if(target) {
      const _msg = JSON.parse(JSON.stringify({ ...newMsg, pop: false }))
      return super.__send<R>(target, _msg)
    }
    // target not exist current context
    else {
      console.log('target not exist current context', microAppMap);
      // 向父级传递消息
      const promises = []
      if(!this._isRootContext()) {
        console.log('this.globalContext.parent', this.globalContext.parent);
        const _msg = JSON.parse(JSON.stringify({ ...newMsg, pop: true }))
        promises.push(super.__send(this.globalContext.parent, _msg))
      }
      // 向子级传递消息
      microAppMap.forEach((value, code) => {
        const _msg = JSON.parse(JSON.stringify({ ...newMsg, pop: false }))
        promises.push(super.__send(value.contentWindow as Window, _msg))
      })
      return Promise.any(promises)
    }
  }
  /**
   * @description receive message
   */
  protected on<T extends Required<PassiveMsg> = Required<PassiveMsg>>(cb: (res: T) => void) {
    return super.__on<T>((res) => {
      if(
        res.target === this.appCode
        || res.target === 'parent'
        || res.target === 'global'
      ) {
        if(res.sourceCode === this.appCode) return; //adapt wujie
        console.log(`%c ${this.appCode} before on message from ${res.sourceCode}： ${JSON.stringify(res)}`, 'color:red');
        cb(res)
      }
    })
  }

  /**
   * @description set current appcode and registry to parent window
   */
  protected setAppCode(val: string): void {
    this.appCode = val;
  }



  /**
   * @description get app
   */
  protected getApp(appCode: string) {
    return microAppMap.get(appCode);
  }
  /**
   * @description registry app
   */
  protected registerApp(appCode: string, target: HTMLIFrameElement) {
    microAppMap.set(appCode, target);
    stateMap.set(target, {});
  }
  /**
   * @description cancel registry
   */
  public unRegisterApp(appCode: string): void {
    microAppMap.delete(appCode);
  }

  /**
   * @description get app state
   */
  protected getState(microAppCode: string) {
    const app = microAppMap.get(microAppCode)
    if(app) {
      return stateMap.get(app)
    }
  }
  /**
   * @description set app state
   */
  protected setState(microAppCode: string, state: any) {
    const app = microAppMap.get(microAppCode)
    if(app) {
      return stateMap.set(app, state)
    }
  }

  /**
   * @description pass message
   */
  private _passive() {
    return super.__on<Required<PassiveMsg>>((msg) => {

      /**
       * 属于当前应用的消息不进行 passive
       */
      if(msg.target === this.appCode
        || msg.target === 'parent'
        || msg.sourceCode === this.appCode) return;
      console.log('%c ' + this.appCode + ' ---passive message-------\n' + JSON.stringify(msg), 'color:green');
      console.log(microAppMap);

      // 向main发送的消息只向上传递，直到root结束
      if(msg.target === 'main') {
        if(!this._isRootContext()) {
          super.__send(this.globalContext.parent, JSON.parse(JSON.stringify({ ...msg, pop: true, popSource: this.appCode })))
        }
        return;
      }

      //  全局发送的消息，或者向非当前应用发送的消息
      if(msg.target === 'global' || msg.target !== this.appCode) {
        //  pass sibling
        microAppMap.forEach((tar, tarCode) => {
          if(tarCode !== msg.popSource) {
            console.log('%c ' + this.appCode + ' passive 2 ' + tarCode + '--------------sibling pass \n' + JSON.stringify({ ...msg, pop: false }), 'color:brown');
            super.__send(tar.contentWindow as Window, JSON.parse(JSON.stringify({ ...msg, pop: false, popSource: this.appCode })))
          }
        })
        // pass parent
        // bug: wujie传输的json会自动改变
        if(msg.pop === true && !this._isRootContext() && microAppMap.size > 0) {
          console.log('%c ' + this.appCode + ' passive 2 parent -------------parent pass\n' + JSON.stringify(msg), 'color:blue');
          super.__send(this.globalContext.parent, JSON.parse(JSON.stringify({ ...msg, popSource: this.appCode })))
        }
      }
    });
  }
  /**
   * @private
   * @description 默认注册事件
   * @returns
   */
  private _maintainRegister() {
    return this.on<Required<DataMsg>>(async (msg) => {
      const microAppCode = msg.sourceCode
      if(msg.type === 'register' && msg.target === 'parent') {
        try {
          // 注册
          const el = await globalConfig.hooks.findRegistryEl.promise(msg.sourceCode, this.appCode);
          if(el) {
            this.registerApp(microAppCode, el);
          }
        } catch(error) {
          if(error instanceof Error) {
            console.error(error.message)
          } else {
            console.error(error);
          }
        }
      }
    })
  }

  protected _isRootContext() {
    return this.globalContext.parent === this.globalContext;
  }
}
