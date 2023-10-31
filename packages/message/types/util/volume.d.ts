import type { NOOP } from "./onEvent";
export type ANYOP = (...args: any[]) => any;
type CancelFn = NOOP;
declare class ArrayVolume<T = any> {
    protected queue: T[];
    constructor();
    /**
     * @description 加入一个回调函数到执行队列
     */
    push(callback: T, priority?: number): CancelFn;
}
export declare class ChainRunner<T extends ANYOP = any> extends ArrayVolume<T> {
    /**
     * @description 加入一个回调函数到执行队列
     */
    push(callback: T, priority?: number): NOOP;
    /**
     * @description 加入一个回调函数到执行队列
     */
    use(callback: T): NOOP;
    /**
     * @description 链式执行回调队列中的回调函数
     */
    run(result: any): any;
}
export {};
