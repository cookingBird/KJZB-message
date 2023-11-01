export default function createWuJiePlugin(options: any): {
    install(connector: any): () => void;
};
