declare global {
  interface Window {
    $wujie: Record<string, any>;
    // 是否存在无界
    __POWERED_BY_WUJIE__?: boolean;
    // 子应用无界实例
    __WUJIE: Record<string, any>;
  }
}
import { globalConfig } from '.';
import { getParams } from './util';

export default function () {
  /**
   * default registry el
   */
  globalConfig.hooks.findRegistryEl.tap('default', (registryAppCode) => {
    const globalCtx = globalConfig.hooks.getContext.call(undefined as any);
    const iframes = Array.from(globalCtx.document.querySelectorAll('iframe'));
    // find by src query
    const target: HTMLIFrameElement | undefined = iframes.find((i) =>
      i.src.includes(registryAppCode),
    );
    if (target) return target;
  });

  globalConfig.hooks.findRegistryEl.tapPromise(
    'adapteWujie',
    async (registryElCode, appCode) => {
      await new Promise((resolve) => setTimeout(resolve));
      console.log(
        '============== ' + appCode + ' findRegistryEl ' + registryElCode,
        window,
      );
      if (customElements.get('wujie-app')) {
        // wujie main application
        let res: HTMLIFrameElement | undefined;
        res = document.querySelector(
          `iframe[data-wujie-flag][name=${registryElCode}]`,
        ) as HTMLIFrameElement;
        if (!res) {
          // case iframe page registry from grand sub application
          res = queryAllFrames().find((i) => i.src.includes(registryElCode));
        }
        return res;
      }
      if (window.$wujie) {
        // wujie subapplication
        const body = window.$wujie.shadowRoot?.body as HTMLBodyElement;
        const iframes = Array.from(body.querySelectorAll('iframe'));
        // find by src query
        const target: HTMLIFrameElement | undefined = iframes.find((i) =>
          i.src.includes(registryElCode),
        );
        return target;
      }
    },
  );
  globalConfig.hooks.afterFindRegistryEl.tap('warnning', (info) => {
    if (!info.el) {
      console.error(
        `${info.appCode} registry el error, can't find app named ${info.registryCode}`,
      );
    }
  });

  /**
   * default ctx
   */
  globalConfig.hooks.getContext.tap('default', (ctx) => {
    return ctx || window;
  });
  globalConfig.hooks.getContext.tap('adapteWujie', (ctx) => {
    // @ts-expect-error adapt wujie application
    return window.__WUJIE_RAW_WINDOW__ || ctx;
  });

  /**
   * default appCode parser
   */
  globalConfig.hooks.praseAppCode.tap('default', () => {
    return getParams(location).microAppCode;
  });
}

function queryAllFrames(
  el: HTMLElement = document.body,
  ind: number = 0,
  result: HTMLIFrameElement[] = [],
): HTMLIFrameElement[] {
  result.push(...Array.from(el.querySelectorAll('iframe')));
  el.querySelectorAll('wujie-app').forEach((app) => {
    // @ts-expect-error
    queryAllFrames(app.shadowRoot?.body, ind + 1, result);
  });
  return result;
}
