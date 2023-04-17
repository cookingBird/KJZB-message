export * from './onEvent'
export * from './volume'
export * from './getParams'
export * from './validator'

import * as Validator from './validator'

export function toObj (t) {
  return Object.assign({}, t)
}

export function omitKeys (obj, ...keys) {
  const res = {}
  keys = keys.flat()
  for (const key in obj) {
    if (keys.length === 1 && Validator.isFunction(keys[0])) {
      const judgeCb = keys[0]
      if (!judgeCb(obj[key], key)) {
        res[key] = obj[key]
      }
    } else {
      if (!keys.includes(key)) {
        res[key] = obj[key]
      }
    }
  }
  return res
}
