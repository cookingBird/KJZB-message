
export type NOOP = () => void;
export type OnMessageCallback = (event: MessageEvent) => void;


export function onMessage(cb: OnMessageCallback): NOOP {
  window.addEventListener('message', cb);
  return () => window.removeEventListener('message', cb);
}
