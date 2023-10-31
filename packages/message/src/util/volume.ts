import type { NOOP } from "./onEvent";

export type ANYOP = (...args: any[]) => any;

type CancelFn = NOOP;
class ArrayVolume<T = any> {
  protected queue: T[];
  constructor() {
    this.queue = [];
  }
  /**
   * @description 加入一个回调函数到执行队列
   */
  push(callback: T, priority = 0): CancelFn {
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

export class ChainRunner<T extends ANYOP = any> extends ArrayVolume<T> {

  /**
   * @description 加入一个回调函数到执行队列
   */
  push(callback: T, priority = 1) {
    return super.push(callback, priority)
  }
  /**
   * @description 加入一个回调函数到执行队列
   */
  use(callback: T) {
    return this.push(callback)
  }
  /**
   * @description 链式执行回调队列中的回调函数
   */
  run(result) {
    let res = result
    for (const fn of this.queue) {
      res = fn(res)
    }
    return res
  }
}
