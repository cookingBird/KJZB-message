import { NOOP } from './onEvent';

/**
 * @description 获取URL search参数
 */
export function getParams(location: Location): Record<string, any> {
  const { href } = location;
  return parseSrcQuery(href);
}
export function parseSrcQuery(src = ''): Record<string, string> {
  const searchReg = /\??(.*)\#?\/?/i;
  const query = src.match(searchReg)?.[1] || '';
  return parseQuery(query);
}
export function parseQuery(query = '') {
  return query
    .split('&')
    .map((p) => p.split('='))
    .reduce((pre, cur) => {
      const [key, value] = cur;
      return {
        ...pre,
        [key]: value,
      };
    }, {});
}

export function debounce<T extends Array<any> = any>(
  fn: (...params: T) => void,
  timer = 300,
  doStart = false,
): NOOP {
  let _t: number;
  return (...params: T) => {
    doStart ? fn(...params) : null;
    clearTimeout(_t);
    _t = setTimeout(() => fn(...params), timer);
  };
}
