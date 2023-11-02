import { Channel } from './core';
import type { PassiveMsg } from './core/Channel';
export type DataMsg<T = any> = {
    type: string;
    data?: T;
} & Pick<PassiveMsg, 'target'> & Partial<Pick<PassiveMsg, 'sourceCode'>>;
export declare class ApplicationChannel extends Channel {
    constructor(options?: {});
    /**
     * @description 发送消息
     */
    $send<R = any>(msg: DataMsg): Promise<R>;
    /**
     * @description 监听消息
     */
    $on<T = any>(type: string | ((res: {
        msg: DataMsg<T>;
        responser: (msg: DataMsg) => void;
    }) => void), cb?: (res: {
        msg: DataMsg<T>;
        data: T;
        responser: (msg: DataMsg) => void;
    }) => void): any;
    /**
     * @description send message to parent
     */
    $emit(tarAndEvent: string, data: any): Promise<any>;
    /**
     * @description send global message
     */
    $emitAll(event: string, data: any): void;
    /**
     * @description 接收消息 T为消息的具体格式
     * @template T
     * @param {IGenericFunction<T,any>} cb 接收消息的回调函数
     * @returns {cancelCallback} 取消回调的函数
     */
    onState(cb: any): any;
    /**
     * @description main
     * @param {Channel} instance
     */
    applicationBootstrap(): void;
    /**
     * @description AppCode
     * @returns {string} microAppCode
     */
    getMicroAppCode(): string;
    /**
     * @description 是否是主应用
     * @returns {boolean}
     */
    isMain(): boolean;
    /**
     * @description maintain state map
     */
    private _statePersistence;
    /**
    * @description build response msg
    */
    private _getResponse;
}
