export * from './onEvent';
export * from './getParams';
export * from './validator';
export declare function ensureInstance(fn: () => any): Promise<ReturnType<typeof fn>>;
