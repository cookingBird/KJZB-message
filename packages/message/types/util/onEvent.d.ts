/**
 * @description 监听pagehide事件
 * @param {Function} cb 回调函数
 * @returns {Function} 取消回调的函数
 */
export function onPageHide(cb: Function): Function;
/**
 * @description 监听load事件
 * @param {Function} cb 回调函数
 * @returns {Function} 取消回调的函数
 */
export function onLoad(cb: Function): Function;
/**
 * @description 监听message事件
 * @param {IGenericFunction<IMessageEventResponse<*>,*>} cb 回调函数
 * @returns {onCallback} 取消回调的函数
 */
export function onMessage(cb: IGenericFunction<IMessageEventResponse<any>, any>): any;
