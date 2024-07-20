import { NOOP } from './onEvent';
/**
 * @description 获取URL search参数
 */
export declare function getParams(location: Location): Record<string, any>;
export declare function parseSrcQuery(src?: string): Record<string, string>;
export declare function parseQuery(query?: string): {};
export declare function debounce<T extends Array<any> = any>(fn: (...params: T) => void, timer?: number, doStart?: boolean): NOOP;
