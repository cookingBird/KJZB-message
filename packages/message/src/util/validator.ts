const _toString = Object.prototype.toString

export function isObject(t: any) {
  return _toString.call(t) === '[object Object]'
}


export function isArray(t: any) {
  return Array.isArray(t)
}


export function isFunction(t: any) {
  return _toString.call(t) === '[object Function]'
}
