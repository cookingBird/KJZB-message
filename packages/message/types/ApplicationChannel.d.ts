import type {
  IGenericFunction,
  IMessage,
  IPostMessageSyntax
} from './core/Channel.type'
import { cancelCallback } from './core/Message.type'

/**
 * @class ApplicationChannel
 */
export class ApplicationChannel extends Channel {
  /**@private */
  private DEFAULT_GLOBAL_CONFIG
  /**
   * @description 发送消息
   * @template T
   * @template R
   * @param {IMessage<T>} msg
   * @returns {Promise<R>}
   */
  $send<T, R>(msg: IMessage<T>): Promise<R>
  /**
   * @description 监听消息
   * @template D
   * @param {string} type 消息类型
   * @param {IGenericFunction<{data:D, responser:Function, msg: IMessage<D>&IPostMessageSyntax }, void>} cb 回调函数
   * @return {cancelCallback} 取消监听的回调
   */
  $on<D>(
    type: string,
    cb: IGenericFunction<
      {
        data: D
        responser: Function
        msg: IMessage<D> & IPostMessageSyntax
      },
      void
    >
  ): cancelCallback
  /**
   * @description 监听消息
   * @template D
   * @param {IGenericFunction<{data:D, responser:function, msg: IMessage<D>&IPostMessageSyntax }, void>} type 消息类型
   * @return {cancelCallback} 取消监听的回调
   */
  $on<D>(
    type: IGenericFunction<
      {
        data: D
        responser: Function
        msg: IMessage<D> & IPostMessageSyntax
      },
      void
    >
  ): cancelCallback
  /**
   *
   * @param {string} emitAndTar
   * @param {object} data
   */
  $emit(emitAndTar: string, data: object): void
  /**
   * @description 发送回调消息
   * @param { string } target 目标应用CODE
   * @param { function } cb 回调函数
   * @param { object | null} params 回调函数参数
   * @returns { promise }
   */
  sendCallback(
    target: string,
    cb: Function,
    params: object | null
  ): Promise<any>
  /**
   * @description 接收消息
   * @param {IGenericFunction<Function,any>} cb 接收消息的回调函数
   * @returns {cancelCallback} 取消回调的函数
   */
  onCallback(cb: IGenericFunction<Function, any>): cancelCallback
  /**
   * @description 获取主应用全局配置
   * @returns {Promise<object>}
   */
  getConfig(options?: {}): Promise<object>
  /**
   * @description 接收消息 T为消息的具体格式
   * @template T
   * @param {IGenericFunction<T,any>} cb 接收消息的回调函数
   * @returns {cancelCallback} 取消回调的函数
   */
  onState<T_1>(cb: IGenericFunction<T_1, any>): cancelCallback
  /**
   * @description main
   * @param {Channel} instance
   */
  applicationBootstrap(): void
  /**
   * @description AppCode
   * @returns {string} microAppCode
   */
  getMicroAppCode(): string
  /**
   * @description 是否是主应用
   * @returns {boolean}
   */
  isMain(): boolean
}
import { Channel } from './core'
