import { globalConfig } from ".";
import { getParams, querySelectAllIframeIncludeShadow } from "./util";


export default function () {
  /**
   * default registry el
   */
  globalConfig.hooks.findRegistryEl.tap('default', (msg) => {
    const globalCtx = globalConfig.hooks.getContext.call(undefined);
    const registryAppCode = msg.sourceCode;
    const iframes = Array.from(globalCtx.document.querySelectorAll('iframe'));
    // find by src query
    let target: HTMLIFrameElement | null = iframes.find(i => i.src.includes(registryAppCode));
    // find by id
    if(!target) {
      target = globalCtx.document.getElementById('gislife-' + registryAppCode) as HTMLIFrameElement;
    }
    if(target) return target;
  })
  globalConfig.hooks.findRegistryEl.tap('adapteWujie', (msg) => {
    const globalCtx = globalConfig.hooks.getContext.call(undefined);
    const registryElCode = msg.sourceCode;
    let target;
    if(globalCtx.customElements?.get("wujie-app")) {
      target = globalCtx.document.querySelector(`iframe[data-wujie-flag][name='${registryElCode}']`);
      if(!target) {
        //消息来自底层子应用
        const ifrmaesInnerWujieApp = querySelectAllIframeIncludeShadow(globalCtx.document.body);
        target = ifrmaesInnerWujieApp.find(i => i.src.includes(registryElCode));
      }
    };
    if(target) return target;
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



