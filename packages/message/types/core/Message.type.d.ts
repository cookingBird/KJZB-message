type MessageOpts = {
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
type onCallback<T> = IGenericFunction<IPostMessageSyntax<T>, void>;
type cancelCallback = () => void;
type IMessageEvent<T> = {
    source: MessageEventSource;
    origin: string;
    data: T;
};
type IMessageEventResponse<T> = IMessageEvent<IMessage<PostMessageType<T>>>;
