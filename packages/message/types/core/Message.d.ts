/**
 * @description Message类只提供发送消息和接受消息的方法，只确保发送的消息属于当前命名空间
 * @class
 */
export class Message {
    /**
     * @description 初始化一个Channel
     * @constructor
     * @param {Window | WindowContent} targetWindow
     * @param {MessageOpts} options Channel初始化options
     */
    constructor(targetWindow: Window | WindowContent, options?: MessageOpts);
    /**@private */
    private appCode;
    /**@private */
    private targetOrigin;
    /**@private */
    private timeout;
    /**@private */
    private belong;
    /**@private */
    private options;
    /**
     * todo 包裹原生消息发生函数，保证消息唯一性,局部性;
     * @description 发送消息
     * @private
     * @param {(IMessage<*>&IPostMessageSyntax<*>) | IPostMessageSyntax<*>} msg
     * @param {HTMLIFrameElement.contentWindow} target
     * @returns { Promise<IMessage<*> & IPostMessageSyntax<*>> }
     */
    private _postMessage;
    /**
     * todo 发送消息
     * @description 发送消息
     * @private
     * @param {Window} target
     * @param {(IMessage<*>&IPostMessageSyntax<*>) | IPostMessageSyntax<*>} msg 消息体
     * @returns { Promise<IMessage<*> & IPostMessageSyntax<*>> } 回复的消息
     */
    private __send;
    /**
     * @description 监听消息 只监听当前命名空间的消息,且非回复消息
     * @private
     * @param {IGenericFunction<IMessage<*>&IPostMessageSyntax<*>,void>} cb 接收到消息的回调函数
     * @returns {cancelCallback} 取消监听事件的函数
     */
    private __on;
}
