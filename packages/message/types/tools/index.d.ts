/**
 * @description send remote callback
 */
export declare function sendCall(target: string, cb: (...p: any[]) => void, params?: Record<string, any>): Promise<any>;
/**
 * @description on remote callback
 */
export declare function onCall(cb: (res: {
    call: (context: any) => void;
    responser: ((data: any) => void) | undefined;
}) => void): import("../util").NOOP;
