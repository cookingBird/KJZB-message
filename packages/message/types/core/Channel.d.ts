/**
 * @class Channel
 */
export class Channel extends Message {
    /**
     * @description 新建一个目标连接频道
     * @constructor
     * @param { Window | windowContent} target 目标上下文
     * @param {ChannelOpts} options 其它参数
     */
    constructor(target: Window | windowContent, options?: ChannelOpts);
    /**
     * !消息派发的主要逻辑
     * todo 如果消息没有target 默认target为 main
     * @description 为每条消息带上popSource
     * @private
     * @param {?Window} target
     * @param {(IMessage<*>&IPostMessageSyntax<*>) | IPostMessageSyntax<*>} msg
     * @returns {Promise<IPostMessageSyntax<T>>}
     */
    private send;
    /**
     * todo 响应自己的消息，如果不是自己的消息则传递消息
     * @description 监听消息，并在自动取消监听
     * @private
     * @template R
     * @param {IGenericFunction<IMessage<R>&IPostMessageSyntax,void>} cb 监听到消息的回调函数
     * @returns {cancelCallback} 取消监听的回调函数
     */
    private on;
    /**
     * !应用注册的主要逻辑
     * @description 设置当前应用的AppCode
     * @private
     * @param {string} val
     * @returns {void}
     */
    private setAppCode;
    /**
     * @description 取消注册子应用
     * @param {string} appCode 子应用Code
     */
    unRegisterApp(appCode: string): boolean;
    /**
     * @private
     * @typedef {[string,HTMLIFrameElement] } targetLike
     * @param {targetLike | undefined} target
     */
    private getApp;
    /**
     * @description 注册子应用
     * @private
     * @param {string} appCode 子应用Code
     * @param {HTMLIFrameElement} target 子应用Iframe元素
     */
    private registerApp;
    /**
     * @private
     * @param {microAppCode} microAppCode
     * @returns {object | undefined}
     */
    private getState;
    /**
     * @private
     * @param {microAppCode} microAppCode
     * @param {object} state
     * @returns {IStateMap}
     */
    private setState;
    /**
     * @private
     * @description 消息传递
     * @returns
     */
    private _passive;
    /**
     * @private
     * @description 默认注册事件
     * @returns
     */
    private _maintainRegister;
    /**
   * @private
   * @param {string} key
   */
    private setGlobalConfigField;
    DEFAULT_GLOBAL_CONFIG: string;
    /**
     * @private
     */
    private _statePersistence;
    /**
     * @private
     */
    private _onConfig;
    /**
   * @description $on收到消息之后的回消息
   * @private
   * @param {IMessage<*>&IPostMessageSyntax<*>} msg
   * @returns {IGenericFunction<IMessage<IPostMessageSyntax<*>>,IMessage<IPostMessageSyntax<*>>>}
   */
    private _getResponse;
}
export type IStateMap = Map<microAppContext, object>;
/**@type {Map<microAppCode,microAppContext>} */
export const microAppMap: Map<microAppCode, microAppContext>;
/**
 * @typedef {Map<microAppContext,object>} IStateMap
 * @description 组件状态Map
 * @type {IStateMap}
 */
export const stateMap: IStateMap;
import { Message } from './Message';
