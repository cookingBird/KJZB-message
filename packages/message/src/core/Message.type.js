/**
 * @description 消息格式
 * @template T
 * @typedef {object} IMessage
 * @property { boolean } response 是否发送成功
 * @property { string } id uuidv4生成
 * @property { string } belong namespace
 * @property { T } data 发送的消息
 */

/**
 * @typedef MessageOpts
 * @type {object}
 * @property { string } [targetOrigin='*'] 目标源
 * @property { number } [timeout=3000] 全局消息发送超时时间
 * @property { string } [namespace='gislife'] channel所属命名空间
 * @property { string } [msgTarget='main'] 消息发送的默认对象
 * @property { string } [appCode] 子应用的CODE
 */

/**
 * @template T
 * @typedef {IGenericFunction<IPostMessageSyntax<T>,void>} onCallback
 */

/**
 * @callback cancelCallback
 * @returns {void}
 */

/**
 * @description 'message'事件的响应消息格式
 * @template T
 * @typedef {MessageEvent<IMessage<PostMessageType<T>>>} IMessageEventResponse
 */
