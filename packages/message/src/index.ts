/**
 * @author dengtao
 */
import './polyfill';
import { type App } from 'vue';
import { ApplicationChannel } from './ApplicationChannel';
export * as tools from './tools';
export * as plugins from './plugins';
import * as components from './components';

export {
  components
}

export const connector = new ApplicationChannel();
connector.applicationBootstrap();

export default function install(app: App) {
  components.vuePlugin.install(app);
  Object.defineProperty(app.config.globalProperties, '$connector', {
    get() {
      return connector
    },
    set(v) {
      throw Error("$connector can't set value")
    }
  })
}

export function use(plugin: { install: (connector: ApplicationChannel) => () => void }) {
  const eventOff = plugin.install(connector);
  return () => {
    eventOff();
  }
}
