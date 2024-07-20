export * from './onEvent';
export * from './getParams';
export * from './validator';

import * as Validator from './validator';

export function ensureInstance(fn: () => any): Promise<ReturnType<typeof fn>> {
  function _getDOM(resolver: (val: any) => void) {
    const instance = fn();
    if (!instance) {
      requestAnimationFrame(() => _getDOM(resolver));
    } else {
      resolver(instance);
    }
  }
  return new Promise((resolve) => {
    _getDOM(resolve);
  });
}
