class ArrayVolume {
  constructor (length) {
    this.queue = length === void 0 ? [] : new Array(length)
  }
  /**
   * 加入一个回调函数到执行队列
   * @param { Function } callback 回调函数
   * @param { number } priority 优先级
   * @returns { Function } remove函数 从队列中移除回调
   */
  push (callback, priority = 0) {
    if (priority === 0) {
      this.queue.push(callback)
    }
    if (priority === 1) {
      this.queue.unshift(callback)
    }
    return () =>
      this.queue.splice(
        this.queue.findIndex(fn => fn === callback),
        1
      )
  }
}

/**
 * @template T
 */
export class ChainRunner extends ArrayVolume {
  constructor () {
    super()
  }
  /**
   * @description 加入一个回调函数到执行队列
   * @param { IGenericFunction<T,T> } callback 回调函数
   * @param { number } [priority=1] 优先级
   * @returns { cancelCallback } remove函数 从队列中移除回调
   */
  push (callback, priority = 1) {
    return super.push(callback, priority)
  }
  /**
   * @description 加入一个回调函数到执行队列
   * @param { IGenericFunction<T,T> } callback 回调函数
   * @returns { cancelCallback } remove函数 从队列中移除回调
   */
  use (callback) {
    return this.push(callback)
  }
  /**
   * @description 链式执行回调队列中的回调函数
   * @param  {*} result 执行参数
   * @returns {T}
   */
  run (result) {
    return this.queue.reduce((acc, cur, index) => {
      return cur(acc)
    }, result)
  }
}
