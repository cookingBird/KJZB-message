/**
 * @description 获取URL search参数
 */
export function getParams(location: Location): Record<string, any> {
  const { href, hash, search } = location;
  const result = {};
  if(search) { // normal condition
    Object.assign(result, parseQuery(search.slice(1)))
  }
  if(hash && href.includes('?')) {
    // in hash mode
    if(href.endsWith('#/')) {
      // pass param incorrect (access by history)
      Object.assign(result, parseQuery(href.split('?')[1]?.slice(0, -2)))
    } else if(search) {
      // pass params correct (by broswer query)
      Object.assign(result, parseQuery(search.slice(1)))
    } else if(href.includes('#')) {
      // pass params by hash
      Object.assign(result, parseQuery(href.split('?')[1]?.slice(0)))
    }
  }

  return result;
}

export function parseQuery(query = '') {
  return query
    .split('&')
    .map(p => p.split('='))
    .reduce((pre, cur) => {
      const [key, value] = cur
      return {
        ...pre,
        [key]: value
      }
    }, {})
}


export function querySelectBodyIframe(body) {
  return Array.from(body.querySelectorAll('iframe'))
}

export function querySelectAllIframeIncludeShadow(el = document.body, result = []): HTMLIFrameElement[] {
  let _result = result.concat(querySelectBodyIframe(el));
  if(window.customElements?.get("wujie-app")) {

    _result = Array.from(el.querySelectorAll('wujie-app'))
      .reduce((pre, wujieApp) => {
        // @ts-expect-error
        return pre.concat(querySelectAllIframeIncludeShadow(wujieApp.shadowRoot.body))
      }, _result)
  }
  return _result;
}
