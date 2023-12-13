import { Channel } from './core/Channel';
import type { PassiveMsg } from './core/Channel';
import type { MessageOps } from './core/Message';
export type DataMsg<T = any> = {
    type: string;
    data?: T;
} & Partial<PassiveMsg>;
export declare class ApplicationChannel extends Channel {
    private _defaultResponseTarget;
    constructor(options?: Partial<MessageOps>);
    /**
     * @description 发送消息
     */
    $send<R = any>(msg: DataMsg): Promise<any>;
    /**
     * @description 监听消息
     */
    $on<T = any>(type: string | ((res: {
        msg: DataMsg<T>;
        responser: (data: any) => void;
    }) => void), cb?: (res: {
        msg: DataMsg<T>;
        data: T;
        responser: (data: any) => void;
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
     */
    onState<T>(cb: (data: T) => {}): any;
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
}
