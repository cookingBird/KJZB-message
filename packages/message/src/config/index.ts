import { AsyncSeriesBailHook, SyncBailHook, SyncHook, SyncWaterfallHook } from 'tapable';
import { type DataMsg } from '../ApplicationChannel';

export default {
  hooks: Object.freeze({
    /**
     * 当父级应用接收到子应用注册的消息时，主应用需要发现注册的应用
     */
    findRegistryEl: new AsyncSeriesBailHook<[string, string], HTMLIFrameElement | undefined>(['msg', 'appCode']),
    /**
     * 发现注册元素后的回调
     */
    afterFindRegistryEl: new SyncHook<{
      appCode: string | undefined;
      registryCode: string;
      el: HTMLIFrameElement | undefined;
    }>(['ctx']),
    /**
     * 当前应用bootstrap时，需要根据父应用parse出当前应用的appcode
     */
    praseAppCode: new SyncWaterfallHook<[string | undefined]>(['appCode']),
    /**
     * 获取上下文
     */
    getContext: new SyncWaterfallHook<[Window]>(['ctx']),
  })
} as const
