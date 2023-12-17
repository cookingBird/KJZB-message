export * from './onEvent'
export * from './getParams'
export * from './validator'

import * as Validator from './validator'

export function omitFileds(obj, ...fileds) {
  const res = {}
  fileds = fileds.flat()
  for(const key in obj) {
    if(fileds.length === 1 && Validator.isFunction(fileds[0])) {
      const judgeCb = fileds[0]
      if(!judgeCb(obj[key], key)) {
        res[key] = obj[key]
      }
    } else {
      if(!fileds.includes(key)) {
        res[key] = obj[key]
      }
    }
  }
  return res
}

export function pickFileds(object, ...fileds) {
  fileds = fileds.flat()
  const res = {}
  for(const key in object) {
    if(Object.hasOwn(object, key) && fileds.includes(key)) {
      res[key] = object[key]
    }
  }
  return res
}


export function ensureInstance(fn: () => any): Promise<ReturnType<typeof fn>> {
  function _getDOM(resolver) {
    const instance = fn();
    if(!instance) {
      requestAnimationFrame(() => _getDOM(resolver))
    }
    else {
      resolver(instance)
    }
  }
  return new Promise(resolve => {
    _getDOM(resolve)
  })
}


export function mergeOps<T>(_defalut: T, ...others: Partial<T>[]): T {
  function _merge(a, b) {
    if(b === void 0) return a;
    return Object.entries(a)
      .map(([key, value]) => {
        const valueA = value;
        const valueB = b[key];

        let res = [key, valueB || valueA];

        if(typeof valueA === 'object' && !Array.isArray(valueA)) {
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
