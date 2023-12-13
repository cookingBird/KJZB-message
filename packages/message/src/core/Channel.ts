import { Message } from './Message'
import type { BaseMsg } from './Message'
import { globalConfig } from '..';
import type { DataMsg } from '@/ApplicationChannel';

export type PassiveMsg = {
  target: 'global' | 'main' | 'parent' | string;
  sourceCode: string;
  popSource: string;
  pop: boolean;
} & BaseMsg;




/**@description app map */
export const microAppMap = new Map<string, HTMLIFrameElement>()

/**
 * @description state map
 */
export const stateMap = new Map<string, any>()

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
  protected send<R = any>(target: Window | undefined, msg: Partial<PassiveMsg>) {
    msg.sourceCode = msg.sourceCode ?? this.appCode;
    msg.popSource = this.appCode;
    /**
     * send message
     */
    if(target) {
      return super.__send<R>(target, msg)
    }
    /**
     * passive message
     */
    else {
      const promises = []
      // 如果target不存在，则向全局发送消息
      if(!this._isRootContext()) {
        promises.push(super.__send(this.globalContext.parent, { ...msg, pop: true }))
      }
      microAppMap.forEach((value, key) => {
        promises.push(super.__send(value.contentWindow, { ...msg, pop: false }))
      })
      return Promise.any(promises)
    }
  }
  /**
   * @description receive message
   */
  protected on(cb: (res: PassiveMsg) => void) {
    return super.__on(res => {
      if(
        res.target === this.appCode
        || res.target === 'parent'
        || res.target === 'global'
      ) {
        cb(res as PassiveMsg)
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
   * @description set current appcode and registry to parent window
   */
  protected emitRegisterEvent(val: string): void {
    const payload = {
      target: 'parent',
      type: 'register',
      sourceCode: val,
      pop: false
    };
    this.send(this.globalContext.parent, payload);
  }

  /**
   * @description cancel registry
   * todo unregistry hook
   */
  public unRegisterApp(appCode: string): void {
    stateMap.delete(appCode)
    microAppMap.delete(appCode)
    console.log('unRegisterApp', microAppMap);
  }
  /**
   * @description get app
   */
  protected getApp(target: string) {
    return microAppMap.get(target)
  }
  /**
   * @description registry app
   */
  protected registerApp(appCode: string, target: HTMLIFrameElement) {
    return microAppMap.set(appCode, target)
  }

  /**
   * @description get app state
   */
  protected getState(microAppCode: string) {
    return stateMap.get(microAppCode)
  }
  /**
   * @description set app state
   */
  protected setState(microAppCode: string, state: any) {
    return stateMap.set(microAppCode, state)
  }

  /**
   * @description pass message
   */
  private _passive() {
    return super.__on((msg: PassiveMsg) => {
      /**
       * 属于当前应用的消息不进行 passive
       */
      if(msg.target === this.appCode || msg.target === 'parent') return;
      /**
       * 不属于当前appCode的消息传递
       */
      //! 如果传递到根节点还未找到
      if(this.appCode === 'main') msg.pop = false
      // 向main发送的消息只向上传递，直到root结束
      if(msg.target === 'main') {
        if(!this._isRootContext()) {
          this.send(this.globalContext.parent, { ...msg, pop: true, })
        }
      }
      //  全局发送的消息，或者向非当前应用发送的消息
      else if(msg.target === 'global' || msg.target !== this.appCode) {
        //  pass sibling
        microAppMap.forEach((tar, tarCode) => {
          if(tarCode !== msg.popSource) {
            this.send(tar.contentWindow, { ...msg, pop: false, })
          }
        })
        // pass parent
        if(msg.pop === true && !this._isRootContext()) {
          this.send(this.globalContext.parent, { ...msg, pop: true })
        }
      }

    })
  }
  /**
   * @private
   * @description 默认注册事件
   * @returns
   */
  private _maintainRegister() {
    return this.on(msg => {
      const microAppCode = msg.sourceCode
      if(msg.type === 'register' && msg.target === 'parent') {
        // 注册
        const el = globalConfig.hooks.findRegistryEl.call(msg as DataMsg);
        globalConfig.hooks.afterFindRegistryEl.call({
          appCode: this.appCode,
          registryCode: microAppCode,
          el,
        })
        if(el) this.registerApp(microAppCode, el);
      }
    })
  }

  protected _isRootContext() {
    return this.globalContext.parent === this.globalContext;
  }
}
