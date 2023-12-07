import { SyncBailHook, SyncHook, SyncWaterfallHook } from 'tapable';
import { type DataMsg } from '../ApplicationChannel';

export default {
  hooks: Object.freeze({
    /**
     * 当父级应用接收到子应用注册的消息时，主应用需要发现注册的应用
     */
    findRegistryEl: new SyncBailHook<DataMsg, HTMLIFrameElement>(['msg']),
    afterFindRegistryEl: new SyncHook<{
      appCode: string;
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
    getContext: new SyncWaterfallHook<[Window | undefined]>(['ctx']),
  })
} as const
