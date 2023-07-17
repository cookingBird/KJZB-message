export type PostMessageTypeInner = 'register' | 'unregister';
export type PostMessageTypeWork = 'state' | 'config' | 'callback' | 'emit' | string;
export type PostMessageType = PostMessageTypeInner | PostMessageTypeWork;
export type IPostTarget = 'main' | 'parent' | 'global' | string;
export type IMessage<T> = {
    /**
     * 发送消息的目标
     */
    target: string | 'main';
    /**
     * 消息类型
     */
    type: PostMessageType;
    /**
     * 发送的消息
     */
    data: T;
};
export type IPostMessageSyntax = {
    /**
     * uuidv4生成
     */
    id: string;
    /**
     * namespace
     */
    belong: string;
    /**
     * 是否冒泡
     */
    pop: boolean;
    /**
     * 冒泡消息来源
     */
    sourceCode: string;
};
export type IGenericFunction<P, T> = (response: P) => T;
export type ChannelOptsRest = {
    /**
     * 本地存储namespace
     */
    localStorageName?: string;
    /**
     * 子应用的CODE
     */
    appCode?: string;
};
export type ChannelOpts = ChannelOptsRest & MessageOpts;
export type microAppCode = string;
export type microAppContext = HTMLIFrameElement;
export type IUserData = any;
export type onCallback<T> = IGenericFunction<IPostMessageSyntax<T>, void>;
