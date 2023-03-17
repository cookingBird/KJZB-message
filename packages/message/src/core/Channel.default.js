/**@description 支持的事件类型的集合 */
export const SUPPORT_MESSAGE_TYPE = [
  'state',
  'config',
  'callback',
  'emit',
  'register',
  'unregister'
]

export const DEFAULT_GLOBAL_CONFIG = 'URL_CONFIG'

window[DEFAULT_GLOBAL_CONFIG] = {
  test: 'test'
}
