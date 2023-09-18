export * from './onEvent'
export * from './volume'
export * from './getParams'
export * from './validator'

import * as Validator from './validator'

export function toObj(t) {
  return Object.assign({}, t)
}

export function omitFileds(obj, ...fileds) {
  const res = {}
  fileds = fileds.flat()
  for (const key in obj) {
    if (fileds.length === 1 && Validator.isFunction(fileds[0])) {
      const judgeCb = fileds[0]
      if (!judgeCb(obj[key], key)) {
        res[key] = obj[key]
      }
    } else {
      if (!fileds.includes(key)) {
        res[key] = obj[key]
      }
    }
  }
  return res
}

export function pickFileds(object, ...fileds) {
  fileds = fileds.flat()
  const res = {}
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key) && fileds.includes(key)) {
      res[key] = object[key]
    }
  }
  return res
}

export function cloneBaseTypeWithDepth(object, maxDepth = 3, depth = 1) {
  const res = {}
  if (depth <= maxDepth) {
    for (const key in object) {
      if (Object.hasOwn(object, key)) {
        const element = object[key]
        if (Validator.isObject(element)) {
          res[key] = cloneBaseTypeWithDepth(element, maxDepth, depth + 1)
        } else if (Validator.isArray(element)) {
          res[key] = element.map(cloneBaseTypeWithDepth, maxDepth, depth + 1)
        } else if (Validator.isFunction(element)) {
          res[key] = element.toString()
        } else {
          res[key] = element
        }
      }
    }
    return res
  }
}
