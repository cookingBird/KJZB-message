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
  if (document.getElementById('gislife-' + microAppCode)) {
    return document.getElementById('gislife-' + microAppCode)
  }

  const iframes = document.querySelectorAll('iframe');
  console.log('iframes', iframes, Array.from(iframes));
  const iframesSearch = Array.from(iframes)
    .filter(frm => frm.style.display !== 'none')
    .map(i => i.src.split("?")[1]);

  let target = null;

  for (let index = 0; index < iframesSearch.length; index++) {
    const search = iframesSearch[index];
    if ((new URLSearchParams(search)).has('microAppCode')) {
      target = iframes[index];
    }
  }

  return target
}
