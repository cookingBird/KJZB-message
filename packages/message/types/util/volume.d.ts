/**
 * @template T
 */
export class ChainRunner<T> extends ArrayVolume {
    constructor();
    /**
     * @description 加入一个回调函数到执行队列
     * @param { IGenericFunction<T,T> } callback 回调函数
     * @param { number } [priority=1] 优先级
     * @returns { cancelCallback } remove函数 从队列中移除回调
     */
    push(callback: IGenericFunction<T, T>, priority?: number): cancelCallback;
    /**
     * @description 加入一个回调函数到执行队列
     * @param { IGenericFunction<T,T> } callback 回调函数
     * @returns { cancelCallback } remove函数 从队列中移除回调
     */
    use(callback: IGenericFunction<T, T>): cancelCallback;
    /**
     * @description 链式执行回调队列中的回调函数
     * @param  {*} result 执行参数
     * @returns {T}
     */
    run(result: any): T;
}
declare class ArrayVolume {
    constructor(length: any);
    queue: any[];
    /**
     * 加入一个回调函数到执行队列
     * @param { Function } callback 回调函数
     * @param { number } priority 优先级
     * @returns { Function } remove函数 从队列中移除回调
     */
    push(callback: Function, priority?: number): Function;
}
export {};
