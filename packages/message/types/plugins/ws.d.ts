export type PluginOpsWs = {
    wujieName: string;
    url: string;
    afterOpen?: (ws: WebSocket) => void;
    afterClose?: (ws: WebSocket) => void;
    afterMessage?: (msg: any) => void;
    beforeMessage?: (msg: any) => {
        type: string;
        data: any;
    };
};
export default function createWsPlugin(options: PluginOpsWs): {
    install(connector: any): () => void;
};
