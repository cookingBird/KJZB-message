import { Message } from './Message'
import { getIframeEl } from '../util'
import type { BaseMsg } from './Message'

export type PassiveMsg = {
  target: 'global' | 'main' | 'parent' | string;
  sourceCode: string;
  popSource: string;
  pop: boolean;
} & BaseMsg;




/**@type {Map<microAppCode,microAppContext>} */
export const microAppMap = new Map<string, HTMLIFrameElement>()

/**
 * @typedef {Map<microAppContext,object>} IStateMap
 * @description 组件状态Map
 * @type {IStateMap}
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
    msg.popSource = msg.popSource ?? this.appCode;
    //* 从主应用发出去的消息都为false
    if (target) {
      return super.__send<R>(target, msg)
    } else {
      const promises = []
      // 如果target不存在，则向全局发送消息
      if (window.parent !== window) {
        promises.push(super.__send(window.parent, { ...msg, pop: true }))
      }
      microAppMap.forEach((value, key) => {
        promises.push(super.__send(value.contentWindow, { ...msg, pop: false }))
      })
      Promise.any(promises).catch(console.error)
    }
  }
  /**
   * @description receive message
   */
  protected on(cb: (res: PassiveMsg) => void) {
    return super.__on(res => {
      if (
        res.target === this.appCode
        || res.target === 'parent'
        || res.target === 'global'
        || (res.target === 'main' && window.parent === window)
      ) {
        cb(res as PassiveMsg)
      }
    })
  }

  /**
   * @description set current appcode and registry to parent window
   */
  protected setAppCode(val: string): void {
    this.appCode = val
    if (window.parent !== window) {
      this.send(window.parent, {
        target: 'parent',
        type: 'register',
        sourceCode: this.appCode,
        pop: false
      })
    }
  }

  /**
   * @description cancel registry
   */
  public unRegisterApp(appCode: string): boolean {
    stateMap.delete(appCode)
    return microAppMap.delete(appCode)
  }
  /**
   * @description get app
   */
  protected getApp(target: string): HTMLIFrameElement | null {
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
      if (msg.target === this.appCode || msg.target === 'parent') return;
      // 不属于当前appCode的消息传递
      //! 如果传递到根节点还未找到
      if (this.appCode === 'main') msg.pop = false
      // 向main发送的消息只向上传递，直到root结束
      if (msg.target === 'main') {
        if (window.parent !== window) {
          this.send(window.parent, { ...msg, pop: true, popSource: this.appCode })
        }
      }
      //  全局发送的消息，或者向非当前应用发送的消息
      else if (msg.target === 'global' || msg.target !== this.appCode) {
        //  pass sibling
        microAppMap.forEach((tar, tarCode) => {
          if (tarCode !== msg.popSource) {
            this.__send(tar.contentWindow, { ...msg, pop: false, popSource: this.appCode })
          }
        })
        // pass parent
        if (msg.pop === true && window.parent !== window) {
          this.__send(window.parent, { ...msg, popSource: this.appCode, pop: true })
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
      if (msg.type === 'register' && msg.target === 'parent') {
        // 注册
        const el = getIframeEl(microAppCode)
        if (el) {
          this.registerApp(microAppCode, el)
        } else {
          // @ts-expect-error
          if (!window.__WUJIE) {
            console.error(
              `register error, can not find element named ${microAppCode}`
            )
          }
        }
      }
    })
  }
}
