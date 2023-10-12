/**
 * @author dengtao
 */
import './polyfill';
import { ApplicationChannel } from './ApplicationChannel';

/**@type {ApplicationChannel} */
const connector = new ApplicationChannel()
connector.applicationBootstrap()

function install(app) {
  Object.defineProperty(app.config.globalProperties, '$connector', {
    get() {
      return connector
    },
    set(v) {
      throw Error("$connector can't set value")
    }
  })
}

function use(plugin) {
  const eventOff = plugin.install(connector);
  return () => {
    eventOff();
  }
}

export {
  connector,
  use,
  install as default
}
