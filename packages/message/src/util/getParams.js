/**
 * @description 获取URL search参数
 * @param {Location} location
 * @returns {object}
 */
export function getParams(location) {
  const { href, hash, search } = location;
  const result = {};
  if(search){ // normal condition
    Object.assign(result, parseQuery(search.slice(1)))
  }
  if (hash && href.includes('?')) { 
    // in hash mode
    if(href.endsWith('#/')){
      // pass param incorrect (access by history)
      Object.assign(result, parseQuery(href.split('?')[1]?.slice(0,-2)))
    }else if(search){
      // pass params correct (by broswer query)
      Object.assign(result, parseQuery(search.slice(1)))
    }else if(href.includes('#')) {
      // pass params by hash
      Object.assign(result, parseQuery(href.split('?')[1]?.slice(0)))
    }
  }

  return result;
}


export function parseQuery(query = ''){
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

export function getIframeEl(microAppCode) {
  const iframes = Array.from(document.querySelectorAll('iframe'));
  // find by src query
  let target = iframes.find(i => i.src.includes(microAppCode));
  // find by id
  if (!target && document.getElementById('gislife-' + microAppCode)) {
    target = document.getElementById('gislife-' + microAppCode)
  }
  /** 
    * 兼容wujie
    */
  if (!target && (window.customElements?.get("wujie-app"))) {
    target = document.querySelector(`iframe[data-wujie-flag][name='${ microAppCode }']`);
    if (!target) {
      //消息来自底层子应用
      const ifrmaesInnerWujieApp = querySelectAllIframeIncludeShadow();
      target = ifrmaesInnerWujieApp.find(i => i.src.includes(microAppCode));
    }
  }

  return target
}

export function querySelectBodyIframe(body) {
  return Array.from(body.querySelectorAll('iframe'))
}

export function querySelectAllIframeIncludeShadow(el = document.body, result = []) {
  let _result = result.concat(querySelectBodyIframe(el));
  if (window.customElements?.get("wujie-app")) {

    _result = Array.from(el.querySelectorAll('wujie-app'))
      .reduce((pre, wujieApp) => {
        return pre.concat(querySelectAllIframeIncludeShadow(wujieApp.shadowRoot.body))
      }, _result)
  }
  return _result;
}
