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
declare const connector: ApplicationChannel;
export type GlobalConfig = typeof globalConfig;
export { components, globalConfig, connector, install as default, use, };
declare function install(app: App): any;
declare function use(plugin: {
    install: (connector: ApplicationChannel, config: GlobalConfig) => () => void;
}): () => void;
