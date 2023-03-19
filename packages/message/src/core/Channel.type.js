/**
 * @description 消息类型
 * @typedef PostMessageTypeInner
 * @type { 'register'| 'unregister'  }
 * @description 业务事件类型
 * @typedef PostMessageTypeWork
 * @type { 'state' | 'config' |'callback'|'emit'| '*' }
 *
 * @typedef { PostMessageTypeInner | PostMessageTypeWork } PostMessageType
 */

/**
 * @description 消息发送对象
 * @typedef  { 'main' | 'parent' | 'global' |'*'} IPostTarget
 */

/**
 * @description message消息格式
 * @template T
 * @typedef IPostMessageSyntax
 * @type {object}
 * @property {boolean} [pop] 是否冒泡
 * @property { string | 'main' } target 发送消息的目标
 * @property { string } [sourceCode] 冒泡消息来源
 * @property { PostMessageType } type 消息类型
 * @property { T } data 发送的消息
 */

/**
 * @description generic function
 * @template P,T
 * @callback IGenericFunction
 * @param {P} response
 * @returns {T}
 */

/**
 * @typedef {object} ChannelOptsRest
 * @property { string } [localStorageName='globalConfig'] 本地存储namespace
 * @property { string } [appCode] 子应用的CODE
 *
 * @typedef {ChannelOptsRest & MessageOpts} ChannelOpts
 */

/**
 * @description 微应用CODE
 * @typedef {string} microAppCode
 * @description 微应用CONTEXT
 * @typedef { HTMLIFrameElement } microAppContext
 */

/**
 * @description 用户发送的的数据
 * @typedef {*} IUserData
 */

/**
 * @template T
 * @typedef {IGenericFunction<IPostMessageSyntax<T>,void>} onCallback
 */
