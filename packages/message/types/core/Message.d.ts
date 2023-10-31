export type BaseMsg = {
    id: string;
    belong: string;
    timeout: number;
    [index: string]: any;
};
export type MessageOps = {
    targetOrigin: string;
    timeout: number;
    namespace: string;
    rejectMissing: boolean;
};
/**
 * @description Message类只提供发送消息和接受消息的方法，只确保发送的消息属于当前命名空间
 */
export declare class Message {
    protected appCode: string;
    protected targetOrigin: string;
    protected timeout: number;
    protected belong: string;
    protected rejectMissing: boolean;
    constructor(options?: Partial<MessageOps>);
    /**
     * @description 发送消息
     */
    private _postMessage;
    /**
     * @description 发送消息
     */
    protected __send<T = any>(target: Window, msg: Partial<BaseMsg>): Promise<T>;
    /**
     * @description 监听消息 只监听当前命名空间的消息,且非回复消息
     */
    protected __on(cb: (msg: BaseMsg) => void): import("../util").NOOP;
}
