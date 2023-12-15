import { globalConfig } from ".";
import { getParams } from "./util";


const maxItems = Array(10).fill('').map((_, index) => index);

export default function () {
  /**
   * default registry el
   */
  globalConfig.hooks.findRegistryEl.tap('default', (code) => {
    const globalCtx = globalConfig.hooks.getContext.call(undefined as any);
    const registryAppCode = code;
    const iframes = Array.from(globalCtx.document.querySelectorAll('iframe'));
    // find by src query
    let target: HTMLIFrameElement | undefined = iframes.find(i => i.src.includes(registryAppCode));
    // find by id
    if(!target) {
      target = globalCtx.document.getElementById('gislife-' + registryAppCode) as HTMLIFrameElement;
    }
    if(target) return target;
  });


  globalConfig.hooks.findRegistryEl.tapPromise('adapteWujie', async (registryElCode, appCode) => {
    await new Promise((resolve) => setTimeout(resolve));
    if(customElements.get('wujie-app')) {
      let res: HTMLIFrameElement | undefined;
      // @ts-expect-error
      if(window.$wujie) { // sub
        for(let i = 0;i < maxItems.length;i++) {
          const context = window[i];
          if(context?.name === registryElCode) {
            console.log(appCode + ' registery ' + registryElCode, context);
            // @ts-expect-error
            res = context.__WUJIE.iframe;
            break;
          };
        };
      } else { // main
        res = document.querySelector(`iframe[data-wujie-flag][name=${registryElCode}]`) as HTMLIFrameElement;
      }
      return res;
    } else {
      return Promise.reject("NOT SUPPORT WUJIE")
    }
  });
  globalConfig.hooks.afterFindRegistryEl.tap('warnning', (info) => {
    if(!info.el) {
      console.error(`${info.appCode} registry el error, can't find app named ${info.registryCode}`)
    }
  });

  /**
   * default ctx
   */
  globalConfig.hooks.getContext.tap('default', (ctx) => {
    return ctx || window
  })
  globalConfig.hooks.getContext.tap('adapteWujie', (ctx) => {
    // @ts-expect-error adapt wujie application
    return window.__WUJIE_RAW_WINDOW__ || ctx
  })

  /**
   * default appCode parser
   */
  globalConfig.hooks.praseAppCode.tap('default', () => {
    return getParams(location).microAppCode
  })
}



