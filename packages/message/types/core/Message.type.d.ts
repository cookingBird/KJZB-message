export type MessageOpts = {
    /**
     * 目标源
     */
    targetOrigin?: string;
    /**
     * 全局消息发送超时时间
     */
    timeout?: number;
    /**
     * channel所属命名空间
     */
    namespace?: string;
    /**
     * 消息发送的默认对象
     */
    msgTarget?: string;
    /**
     * 子应用的CODE
     */
    appCode?: string;
};
export type onCallback<T> = IGenericFunction<IPostMessageSyntax<T>, void>;
export type cancelCallback = () => void;
export type IMessageEvent<T> = {
    source: MessageEventSource;
    origin: string;
    data: T;
};
export type IMessageEventResponse<T> = IMessageEvent<IMessage<PostMessageType<T>>>;
