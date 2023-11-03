


/**
 * @author dengtao
 */
import './polyfill';
import type { App } from 'vue';
import { ApplicationChannel } from './ApplicationChannel';
export * as tools from './tools';
export * as plugins from './plugins';
import * as components from './components';
export { components };
export declare const connector: ApplicationChannel;
export default function install(app: App): void;
export declare function use(plugin: {
    install: (connector: ApplicationChannel) => () => void;
}): () => void;
