type PostMessageTypeInner = 'register' | 'unregister';
type PostMessageTypeWork = 'state' | 'config' | 'callback' | 'emit' | string;
type PostMessageType = PostMessageTypeInner | PostMessageTypeWork;
type IPostTarget = 'main' | 'parent' | 'global' | string;
type IMessage<T> = {
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
type IPostMessageSyntax = {
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
type IGenericFunction<P, T> = (response: P) => T;
type ChannelOptsRest = {
    /**
     * 本地存储namespace
     */
    localStorageName?: string;
    /**
     * 子应用的CODE
     */
    appCode?: string;
};
type ChannelOpts = ChannelOptsRest & MessageOpts;
type microAppCode = string;
type microAppContext = HTMLIFrameElement;
type IUserData = any;
type onCallback<T> = IGenericFunction<IPostMessageSyntax<T>, void>;
