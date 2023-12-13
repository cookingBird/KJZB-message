import type { GlobalConfig } from '@/index';
export default function createWuJiePlugin(options: any): {
    install(connector: any, globalConfig: GlobalConfig): () => void;
};
