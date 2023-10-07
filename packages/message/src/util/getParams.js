/**
 * @description 获取URL search参数
 * @param {Location} location
 * @returns {object}
 */
export function getParams(location) {
  const search = location.href.split('?')[1]
  if (!search) return null;
  const result = {}
  search
    .split('&')
    .map(p => p.split('='))
    .forEach(item => {
      result[item[0]] = item[1]
    })
  return result
}


export function getIframeEl(microAppCode) {
  let target = null;
  if (document.getElementById('gislife-' + microAppCode)) {
    target = document.getElementById('gislife-' + microAppCode)
  }
  /** 
    * wujie.__WUJIE 如果为true说明当前运行环境是子应用
    * window.__POWERED_BY_WUJIE__ 如果为false说明子应用还没初始化完成 
    */ 
  else if (window.__POWERED_BY_WUJIE__) {
    target = document.querySelector(`iframe[data-wujie-flag][name='${ microAppCode }']`);
  }

  return target
}
