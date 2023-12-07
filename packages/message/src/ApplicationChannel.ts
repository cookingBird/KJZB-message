import { Channel, stateMap, microAppMap } from './core';
import { getParams, isObject } from './util';
import type { PassiveMsg } from './core/Channel';
import type { MessageOps, BaseMsg } from './core/Message';


export type DataMsg<T = any> = {
  type: string;
  data?: T;
} & Partial<PassiveMsg>


export class ApplicationChannel extends Channel {

  constructor(options: Partial<MessageOps> = {}) {
    super(options)
    this._statePersistence()
  }

  /**
   * @description 发送消息
   */
  public $send<R = any>(msg: DataMsg) {
    if(!msg.target || !msg.type) throw Error('message syntax error')
    //* main parent发送
    if(msg.target === 'main' || msg.target === 'parent') {
      return super.send<R>(window.parent, msg)
    }
    else {
      if(msg.type === 'setState') {
        //* cache state
        stateMap.set(msg.target, msg.data);
      }
      const targetEl = this.getApp(msg.target);
      console.log('/microAppMap', microAppMap);
      if(!targetEl) throw Error(`send msg,current layer target not exist target named ${msg.target}, message type is ${msg.type}`);
      return super.send<R>(targetEl.contentWindow, msg);
    }
  }

  /**
   * @description 监听消息
   */
  public $on<T = any>(
    type: string | ((res: { msg: DataMsg<T>, responser: (data: any) => void }) => void),
    cb?: (res: { msg: DataMsg<T>, data: T, responser: (data: any) => void }) => void) {

    let onCancel
    if(cb && typeof cb !== 'function') {
      throw Error(`$on callback param error,current type is ${typeof cb}`)
    }
    if(typeof type !== 'string' && typeof type !== 'function') {
      throw Error('type parma type error')
    }
    if(typeof type === 'function') {
      onCancel = super.on(msg => {
        const responser = this._getResponse(msg as DataMsg)
        type({ responser, msg: msg as unknown as DataMsg<T> })
      })
      return onCancel
    }
    else {
      onCancel = super.on(msg => {
        if(msg.type === type) {
          const responser = this._getResponse(msg as DataMsg)
          cb({ data: msg.data, responser, msg: msg as unknown as DataMsg<T> })
        }
      })
    }
    return onCancel
  }

  /**
   * @description send message to parent
   */
  public $emit(tarAndEvent: string, data: any) {
    if(!tarAndEvent) {
      throw Error('emit is empty')
    }
    let target = 'parent';
    let event: string;
    if(tarAndEvent.includes(':')) {
      target = tarAndEvent.split(":")[0] || 'parent';
      event = tarAndEvent.split(":")[1];
    } else {
      event = tarAndEvent;
    }
    return this.$send({
      target,
      type: event,
      data: data
    })
  }

  /**
   * @description send global message
   */
  public $emitAll(event: string, data: any) {
    this.$send({
      target: 'global',
      type: event,
      data: data
    })
  }


  /**
   * @description 接收消息 T为消息的具体格式
   */
  public onState<T>(cb: (data: T) => {}) {
    if(typeof cb !== 'function') {
      throw Error(`onState callback param error,current type is ${typeof cb}`)
    }
    this.$send({
      target: 'parent',
      type: 'getState'
    })?.then(cb)
    return this.$on(({ msg }) => {
      if(msg.type === 'setState') {
        cb(msg.data)
      }
    })
  }

  /**
   * @description main
   */
  public applicationBootstrap() {
    console.log('bootstrap-----------------');
    //* 获取应用AppCode
    const params = getParams(window.location);
    const { microAppCode: appCode } = params;
    // todo 此处应设置一个获取appCode的HOOK
    //* 如果当前应用不是主应用，且当前应用是被嵌入到message框架之中
    if(window.parent !== window && appCode) {
      //* 子应用
      this.setAppCode(appCode);
      this.emitRegisterEvent(appCode);
    }
    else {
      //* 主应用
      this.setAppCode('main');
    }
  }

  /**
   * @description AppCode
   */
  public getMicroAppCode() {
    return this.appCode
  }

  /**
   * @description 是否是主应用
   */
  public isMain() {
    return this.appCode === 'main'
  }

  /**
   * @description maintain state map
   */
  private _statePersistence() {
    this.$on('getState', ({ responser, msg }) => {
      const state = stateMap.get(msg.sourceCode)
      if(state) responser(state)
    })
  }

  /**
    * @description build response msg
    */
  private _getResponse(msg: DataMsg<any>) {
    return data => {
      const responseMsg = {
        id: msg.id,
        target: msg.sourceCode,
        type: msg.type,
        sourceCode: this.appCode,
        popSource: this.appCode,
        data: data
      };
      return this.$send(responseMsg);
    }
  }
}
