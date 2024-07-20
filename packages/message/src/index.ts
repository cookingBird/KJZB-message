/**
 * @author dengtao
 */
import './polyfill';
import { type App } from 'vue';
import { ApplicationChannel } from './ApplicationChannel';
export * as tools from './tools';
import * as components from './components';
import { microAppMap } from './core/Channel';
import globalConfig from './config';
import initPlugins from './init';
initPlugins();

const connector = new ApplicationChannel();
connector.applicationBootstrap();

export type GlobalConfig = typeof globalConfig;
const VERSION = '4.3.2';

export {
  components,
  globalConfig,
  connector,
  install as default,
  use,
  VERSION,
  microAppMap,
};

function install(app: App): any {
  components.vuePlugin.install(app);
  Object.defineProperty(app.config.globalProperties, '$connector', {
    get() {
      return connector;
    },
    set(v) {
      throw Error("$connector can't set value");
    },
  });
}

function use(plugin: {
  install: (connector: ApplicationChannel, config: GlobalConfig) => () => void;
}) {
  const eventOff = plugin.install(connector, globalConfig);
  return () => {
    eventOff();
  };
}
