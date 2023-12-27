import { Channel } from './core/Channel';
import type { PassiveMsg } from './core/Channel';
import type { MessageOps } from './core/Message';
import { NOOP } from './util';
export type DataMsg<T = any> = {
    type: string;
    data?: T;
} & PassiveMsg;
export declare class ApplicationChannel extends Channel {
    constructor(options?: Partial<MessageOps>);
    /**
     * @description 发送消息
     */
    $send<R = any>(msg: DataMsg): Promise<R>;
    /**
     * @description 监听消息
     */
    $on<R = any>(type: string | ((res: {
        msg: Required<DataMsg<R>>;
        responser: ((data: R) => void) | undefined;
    }) => void) | undefined, cb?: (res: {
        msg: Required<DataMsg<R>>;
        data: R;
        responser: ((data: any) => void) | undefined;
    }) => void): NOOP;
    /**
     * @description 监听消息
     */
    $once<R = any>(type: string | ((res: {
        msg: Required<DataMsg<R>>;
        responser: ((data: R) => void) | undefined;
    }) => void) | undefined, cb?: (res: {
        msg: Required<DataMsg<R>>;
        data: R;
        responser: ((data: any) => void) | undefined;
    }) => void): void;
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
     */
    onState<T = any>(cb: (data: T | undefined) => {}): NOOP;
    /**
     * @description main
     */
    applicationBootstrap(): void;
    /**
     * @description AppCode
     */
    getMicroAppCode(): string;
    /**
     * @description 是否是主应用
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
    /**
     * @description set current appcode and registry to parent window
     */
    private _emitRegisterEvent;
}
