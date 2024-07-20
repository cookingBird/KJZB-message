/**
 * @author dengtao
 */
import './polyfill';
import { type App } from 'vue';
import { ApplicationChannel } from './ApplicationChannel';
export * as tools from './tools';
export * as plugins from './plugins';
import * as components from './components';
import { microAppMap } from './core/Channel';
import globalConfig from './config';
declare const connector: ApplicationChannel;
export type GlobalConfig = typeof globalConfig;
declare const VERSION = "4.3.2";
export { components, globalConfig, connector, install as default, use, VERSION, microAppMap, };
declare function install(app: App): any;
declare function use(plugin: {
    install: (connector: ApplicationChannel, config: GlobalConfig) => () => void;
}): () => void;
