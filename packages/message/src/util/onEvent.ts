import { globalConfig } from "..";

export type NOOP = () => void;

let globalContext: Window;
export type OnMessageCallback = (event: MessageEvent) => void;


export function onMessage(cb: OnMessageCallback): NOOP {
  if(!globalContext) {
    globalContext = globalConfig.hooks.getContext.call(undefined);
  }
  globalContext.addEventListener('message', cb);
  return () => globalContext.removeEventListener('message', cb);
}
