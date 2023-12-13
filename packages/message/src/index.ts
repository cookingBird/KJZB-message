/**
 * @author dengtao
 */
import './polyfill';
import { type App } from 'vue';
import { ApplicationChannel } from './ApplicationChannel';
export * as tools from './tools';
export * as plugins from './plugins';
import * as components from './components';
import globalConfig from './config';
import initPlugins from './init';
initPlugins();


const connector = new ApplicationChannel();
connector.applicationBootstrap();

export type GlobalConfig = typeof globalConfig;

export {
  components,
  globalConfig,
  connector,
  install as default,
  use,
}

function install(app: App): any {
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

function use(plugin: { install: (connector: ApplicationChannel, config: GlobalConfig) => () => void }) {
  const eventOff = plugin.install(connector, globalConfig);
  return () => {
    eventOff();
  }
}
