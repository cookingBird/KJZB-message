/**
 * @callback judgeCallback
 * @param {?HTMLIFrameElement}
 * @returns {boolean}
 */
/**
 *
 * @param {string} id 目标元素id
 * @param {?judgeCallback} judgeCb 确定元素获取成功的judge函数
 * @param {'requestAnimationFrame' | 'setTimeout'} [type='requestAnimationFrame'] 轮询函数类型
 * @returns {promise<HTMLIFrameElement | null>}
 */
export function requestDom(id: string, judgeCb?: judgeCallback | null, type?: 'requestAnimationFrame' | 'setTimeout'): promise<HTMLIFrameElement>;
export type judgeCallback = (: HTMLIFrameElement | null) => boolean;
