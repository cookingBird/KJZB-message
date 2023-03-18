const _toString = Object.prototype.toString

export function isObject (t) {
  return _toString.call(t) === '[object Object]'
}
