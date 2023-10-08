export * from './onEvent'
export * from './volume'
export * from './getParams'
export * from './validator'

import * as Validator from './validator'

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
      console.warn('pickFileds-----------------', key, fileds)
      res[key] = object[key]
    }
  }
  return res
}

export function deepCloneBaseType(object, maxDepth = 3, depth = 1) {
  const res = {}
  if (depth <= maxDepth) {
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key]
        if (Validator.isObject(element)) {
          res[key] = deepCloneBaseType(element, maxDepth, depth + 1)
        } else if (Validator.isArray(element)) {
          res[key] = element.map(deepCloneBaseType, maxDepth, depth + 1)
        } else if (Validator.isFunction(element)) {
          res[key] = element.toString()
        } else {
          res[key] = element
        }
      }
    }

    return res
  }
  // return JSON.parse(JSON.stringify(object))
}


export function ensureInstance(fn) {
  function _getDOM(resolver) {
    const instance = fn();
    if (!instance) {
      requestAnimationFrame(() => _getDOM(resolver))
    } else {
      resolver(instance)
    }
  }
  return new Promise(resolve => {
    _getDOM(resolve)
  })
}


export function mergeOps(_defalut, ...others) {
  function _merge(a, b) {
    if (b === void 0) return a;
    return Object.entries(a)
      .map(([key, value]) => {
        const valueA = value;
        const valueB = b[key];

        let res = [key, valueB || valueA];

        if (typeof valueA === 'object' && !Array.isArray(valueA)) {
          res = [key, _merge(valueA, valueB)]
        }

        return res;
      })
      .reduce((pre, cur) => {
        return {
          ...pre,
          [cur[0]]: cur[1]
        }
      }, {})
  }
  let res = _defalut;
  others.forEach(ops => {
    res = _merge(res, ops)
  })

  return res;
}
