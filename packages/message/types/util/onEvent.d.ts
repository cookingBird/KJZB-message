export type NOOP = () => void;
export type OnMessageCallback = (event: MessageEvent) => void;
export declare function onMessage(cb: OnMessageCallback): NOOP;
