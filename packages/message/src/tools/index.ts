import { connector } from '../index';
/**
 * @description send remote callback
 */
export function sendCall(
  target: string,
  cb: (...p: any[]) => void,
  params?: Record<string, any>) {

  if(typeof cb !== 'function') {
    throw Error('callback or params type error')
  }
  if(!target) {
    throw Error('missing target')
  }
  return connector.$send({
    type: 'callback',
    target: target,
    data: {
      fn: cb.toString(),
      params: params
    }
  })
}

/**
 * @description on remote callback
 */
export function onCall(cb: (res: { call: (context: any) => void; responser: ((data: any) => void) | undefined }) => void) {

  return connector.$on('callback', ({ data, responser }) => {
    const { fn, params } = data
    if(params && typeof params === 'object') {
      const paramsName = Object.keys(params)
      const paramsValue = Object.values(params)
      const func = Function(
        'context',
        ...paramsName,
        `(${fn})(${['context', ...paramsName].join(',')})`
      )
      cb({
        call: function (ctx) {
          func(ctx, ...paramsValue)
        },
        responser: responser
      })
    } else {
      const func = Function('ctx', `(${fn})(ctx)`)
      cb({
        call: function (ctx) {
          func(ctx)
        },
        responser: responser
      })
    }
  })
}
