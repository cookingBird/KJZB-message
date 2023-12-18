import { AsyncSeriesBailHook, SyncHook, SyncWaterfallHook } from 'tapable';
declare const _default: {
    readonly hooks: Readonly<{
        /**
         * 当父级应用接收到子应用注册的消息时，主应用需要发现注册的应用
         */
        findRegistryEl: AsyncSeriesBailHook<[string, string], HTMLIFrameElement | undefined, import("tapable").UnsetAdditionalOptions>;
        /**
         * 发现注册元素后的回调
         */
        afterFindRegistryEl: SyncHook<{
            appCode: string | undefined;
            registryCode: string;
            el: HTMLIFrameElement | undefined;
        }, void, import("tapable").UnsetAdditionalOptions>;
        /**
         * 当前应用bootstrap时，需要根据父应用parse出当前应用的appcode
         */
        praseAppCode: SyncWaterfallHook<[string | undefined], import("tapable").UnsetAdditionalOptions>;
        /**
         * 获取上下文
         */
        getContext: SyncWaterfallHook<[Window], import("tapable").UnsetAdditionalOptions>;
    }>;
};
export default _default;
