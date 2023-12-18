export * from './onEvent';
export * from './getParams';
export * from './validator';
export declare function omitFileds(obj: any, ...fileds: any[]): {};
export declare function pickFileds(object: any, ...fileds: any[]): {};
export declare function ensureInstance(fn: () => any): Promise<ReturnType<typeof fn>>;
export declare function mergeOps<T>(_defalut: T, ...others: Partial<T>[]): T;
