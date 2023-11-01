export type PluginOpsWs = {
    wujieName: string;
    messageCallback?: (...p: any[]) => {
        type: string;
        data: any;
    };
};
export default function createWuJieVue3Plugin(options: PluginOpsWs): {
    install(connector: any): () => void;
};
