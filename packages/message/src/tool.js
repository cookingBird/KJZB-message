import { connector } from './index'
import { v4 as uuidv4 } from 'uuid'
import { isObject } from './util'

/**
 * @description 发送回调消息
 * @param { string } target 目标应用CODE
 * @param { function } cb 回调函数
 * @param { object | null} params 回调函数参数
 * @returns { promise }
 */
export function sendCallback (target, cb, params) {
  if (typeof cb !== 'function' || params === undefined) {
    throw Error('callback or params type error')
  }
  if (!target) {
    throw Error('missing target')
  }
  return connector.$send({
    type: 'callback',
    target: target,
    data: {
      callback: cb.toString(),
      params: params
    }
  })
}
/**
 * @description 接收消息
 * @param {IGenericFunction<Function,any>} cb 接收消息的回调函数
 * @param { Vue.Component } context 组件上下文
 * @returns {cancelCallback} 取消回调的函数
 */
export function onCallback (context, cb) {
  if (typeof cb !== 'function') {
    throw Error(`onCallback callback param error,current type is ${typeof cb}`)
  }
  const onCancel = connector.on(msg => {
    if (msg.type === 'callback') {
      const data = msg.data
      if (data.params !== null) {
        const paramsName = Object.keys(data.params)
        const paramsValue = Object.values(data.params)
        const func = Function(
          ...paramsName,
          `(${data.callback})(${paramsName.join(',')})`
        )
        cb({
          exec: function (ctx) {
            func.apply(ctx, paramsValue)
          },
          responser
        })
      } else {
        const func = Function(`(${data.callback})()`)
        cb({
          exec: function (ctx) {
            func.apply(ctx)
          },
          responser
        })
      }
    }
  })
  if (context) {
    context.$on('hook:beforeDestory', onCancel)
  }
  return onCancel
}

/**
 * @description 获取主应用全局配置
 * @returns {Promise<object>}
 */
export function getConfig (options = {}) {
  const { timeout = 3 * 1000 } = options
  let sendOk = false
  return new Promise((resolve, reject) => {
    const id = uuidv4()
    connector.$send({
      target: 'main',
      type: 'config',
      id: id
    })
    const cancel = connector.$on(undefined, ({ data }) => {
      if (isObject(data) && data.id === id) {
        cancel()
        sendOk = true
        resolve(data.data)
      }
    })
    setTimeout(() => {
      if (!sendOk) {
        reject('getConfig error')
        cancel()
      }
    }, timeout)
  })
}

/**
 * @description 接收消息 T为消息的具体格式
 * @template T
 * @param {IGenericFunction<T,any>} cb 接收消息的回调函数
 * @param { Vue.Component } context 组件上下文
 * @returns {cancelCallback} 取消回调的函数
 */
export function onState (context, cb) {
  if (typeof cb !== 'function') {
    throw Error(`onState callback param error,current type is ${typeof cb}`)
  }
  connector
    .$send({
      target: 'parent',
      type: 'getState'
    })
    .then(res => {
      cb(res.data)
    })
  return connector.$on(context, ({ data }) => {
    if (data.type === 'setState') {
      cb(data.data)
    }
  })
}
