import { Message } from './Message'
import { getIframeEl,isObject } from '../util'

/**@type {Map<microAppCode,microAppContext>} */
const microAppMap = new Map()

/**
 * @typedef {Map<microAppContext,object>} IStateMap
 * @description 组件状态Map
 * @type {IStateMap}
 */
const stateMap = new Map()

export { microAppMap, stateMap }
/**
 * @class Channel
 */
export class Channel extends Message {
  /**
   * @description 新建一个目标连接频道
   * @constructor
   * @param { Window | windowContent} target 目标上下文
   * @param {ChannelOpts} options 其它参数
   */
  constructor(target, options = {}) {
    super(target, options)
    //*消息转发
    this._passive()
    //*维护注册表
    this._maintainRegister()
  }

  /**
   * !消息派发的主要逻辑
   * todo 如果消息没有target 默认target为 main
   * @description 为每条消息带上popSource
   * @private
   * @param {?Window} target
   * @param {(IMessage<*>&IPostMessageSyntax<*>) | IPostMessageSyntax<*>} msg
   * @returns {Promise<IPostMessageSyntax<T>>}
   */
  send(target, msg) {
    msg.sourceCode =
      msg.sourceCode === undefined ? this.appCode : msg.sourceCode
    msg.popSource = msg.popSource === undefined ? this.appCode : msg.popSource
    //* 从主应用发出去的消息都为false
    if (target) {
      return super.__send(target, msg)
    } else {
      const promises = []
      //todo 如果target不存在，则向全局发送消息
      if (window.parent !== window) {
        console.log(
          `send >>> parent---${ this.appCode }----------------`,
          msg,
          microAppMap
        )
        promises.push(
          super.__send(window.parent, Object.assign({}, msg, { pop: true }))
        )
      }
      microAppMap.forEach((value, key) => {
        console.log(
          `send >>> sibling--is ${ key }--${ this.appCode }----------------`,
          msg,
          microAppMap
        )
        promises.push(
          super.__send(
            value.contentWindow,
            Object.assign({}, msg, { pop: false })
          )
        )
      })
      Promise.any(promises).catch(console.error)
    }
  }
  /**
   * todo 响应自己的消息，如果不是自己的消息则传递消息
   * @description 监听消息，并在自动取消监听
   * @private
   * @template R
   * @param {IGenericFunction<IMessage<R>&IPostMessageSyntax,void>} cb 监听到消息的回调函数
   * @returns {cancelCallback} 取消监听的回调函数
   */
  on(cb) {
    return super.__on(res => {
      if (
        res.target === this.appCode ||
        res.target === 'parent' ||
        res.target === 'global' ||
        res.target === 'pop'
      ) {
        cb(res)
      }
    })
  }

  /**
   * !应用注册的主要逻辑
   * @description 设置当前应用的AppCode
   * @private
   * @param {string} val
   * @returns {void}
   */
  setAppCode(val) {
    this.appCode = val
    // todo 当前应用不是子应用，则向主应用注册
    // todo 自动向父级注册
    if (window.parent !== window) {
      this.send(window.parent, {
        target: 'parent',
        type: 'register',
        sourceCode: this.appCode,
        pop: false
      })
    }
  }

  /**
   * @description 取消注册子应用
   * @param {string} appCode 子应用Code
   */
  unRegisterApp(appCode) {
    return microAppMap.delete(appCode)
  }
  /**
   * @private
   * @typedef {[string,HTMLIFrameElement] } targetLike
   * @param {targetLike | undefined} target
   */
  getApp(target) {
    return microAppMap.get(target)
  }
  /**
   * @description 注册子应用
   * @private
   * @param {string} appCode 子应用Code
   * @param {HTMLIFrameElement} target 子应用Iframe元素
   */
  registerApp(appCode, target) {
    microAppMap.set(appCode, target)
  }

  /**
   * @private
   * @param {microAppCode} microAppCode
   * @returns {object | undefined}
   */
  getState(microAppCode) {
    return stateMap.get(microAppCode)
  }
  /**
   * @private
   * @param {microAppCode} microAppCode
   * @param {object} state
   * @returns {IStateMap}
   */
  setState(microAppCode, state) {
    return stateMap.set(microAppCode, state)
  }

  /**
   * @private
   * @description 消息传递
   * @returns
   */
  _passive() {
    return super.__on(msg => {

      // todo 不属于当前appCode的消息传递
      if (msg.target !== this.appCode && msg.target !== 'parent') {
        console.log(
          `>>>>>>>>>>>>>>>>>>>passive>>>${ this.appCode }>>>>>>>>>>>>>>>>>>>>>>>\n`,
          msg,
          '\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'
        )
        //! 如果传递到根节点还未找到
        if (this.appCode === 'main') msg.pop = false
        // todo 向main发送的消息只向上传递，直到root结束
        if (msg.target === 'main' || msg.target === 'pop') {
          if (window.parent !== window) {
            this.send(
              window.parent,
              Object.assign({}, msg, { pop: true, popSource: this.appCode })
            )
          }
          return
        }
        // todo 向全局发送的消息，或者向非当前子应用的消息全局传递
        else if (msg.target === 'global' || msg.target !== this.appCode) {
          // todo pass sibling
          microAppMap.forEach((tar, tarCode) => {
            if (tarCode !== msg.popSource) {
              console.log(
                `passive send sibling- ${ tarCode }--------------- current is ${ this.appCode }-----------------------\n`,
                msg
              )
              this.__send(
                tar.contentWindow,
                Object.assign({}, msg, { pop: false, popSource: this.appCode })
              )
            }
          })
          //todo pass parent
          if (msg.pop === true && window.parent !== window) {
            this.__send(
              window.parent,
              Object.assign({}, msg, { popSource: this.appCode, pop: true })
            )
          }
        }
      }
    })
  }
  /**
   * @private
   * @description 默认注册事件
   * @returns
   */
  _maintainRegister() {
    return this.on(msg => {
      const microAppCode = msg.sourceCode
      if (msg.type === 'register' && msg.target === 'parent') {
        //todo 注册
        const el = getIframeEl(microAppCode)
        if (el) {
          this.registerApp(microAppCode, el)
        } else {
          throw Error(
            `register error, can not find element named ${ microAppCode }}`
          )
        }
      }
    })
  }
    /**
   * @private
   * @param {string} key
   */
    setGlobalConfigField(key) {
      if (key) this.DEFAULT_GLOBAL_CONFIG = key
    }
    /**
     * @private
     */
    _statePersistence() {
      this.$on('getState', ({ responser, msg }) => {
        const state = stateMap.get(msg.sourceCode)
        if (state) responser(state)
      })
    }
    /**
     * @private
     */
    _onConfig() {
      if (this.isMain()) {
        this.$on('config', ({ responser, msg }) => {
          responser(window[this.DEFAULT_GLOBAL_CONFIG])
        })
      }
    }
    /**
   * @description $on收到消息之后的回消息
   * @private
   * @param {IMessage<*>&IPostMessageSyntax<*>} msg
   * @returns {IGenericFunction<IMessage<IPostMessageSyntax<*>>,IMessage<IPostMessageSyntax<*>>>}
   */
    _getResponse(msg) {
      return data => {
        msg.target = msg.sourceCode
        msg.sourceCode = this.appCode
        msg.popSource = this.appCode
        msg.pop = msg.type === 'config' ? true : undefined
        let type
        if (isObject(data) && data._type) {
          type = data._type
          delete data._type
        } else {
          type = msg.type
          console.warn(
            `responser miss _type filed, maybe cause infinite loop,current type is ${ type }`
          )
        }
  
        return this.$send(Object.assign(msg, { data: data, type: type }))
      }
    }
}
