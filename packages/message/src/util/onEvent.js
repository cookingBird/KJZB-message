import '../core/Channel.type'
/**
 * @description 监听pagehide事件
 * @param {Function} cb 回调函数
 * @returns {Function} 取消回调的函数
 */
export function onPageHide (cb) {
  console.log('page hide-------------------------------')
  window.addEventListener('pagehide', cb)
  return () => window.removeEventListener('pagehide', cb)
}

/**
 * @description 监听load事件
 * @param {Function} cb 回调函数
 * @returns {Function} 取消回调的函数
 */
export function onLoad (cb) {
  window.addEventListener('load', cb)
  return () => window.removeEventListener('load', cb)
}

/**
 * @description 监听message事件
 * @param {IGenericFunction<IMessageEventResponse,*>} cb 回调函数
 * @returns {Function} 取消回调的函数
 */
export function onMessage (cb) {
  window.addEventListener('message', cb)
  return () => window.removeEventListener('message', cb)
}
