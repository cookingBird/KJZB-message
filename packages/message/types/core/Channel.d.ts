import { Message } from './Message';
import type { BaseMsg } from './Message';
export type PassiveMsg = {
    target: string;
    sourceCode?: string;
    popSource?: string;
    pop?: boolean;
} & Partial<BaseMsg>;
/**@description app map */
export declare const microAppMap: Map<string, HTMLIFrameElement>;
/**
 * @class Channel
 */
export declare class Channel extends Message {
    constructor(options?: {});
    /**
     * @description send or passive message
     */
    protected send<R = any>(target: Window | undefined | null, msg: PassiveMsg): Promise<R>;
    /**
     * @description receive message
     */
    protected on<T extends Required<PassiveMsg> = Required<PassiveMsg>>(cb: (res: T) => void): import("../util").NOOP;
    /**
     * @description set current appcode and registry to parent window
     */
    protected setAppCode(val: string): void;
    /**
     * @description get app
     */
    protected getApp(appCode: string): HTMLIFrameElement | undefined;
    /**
     * @description registry app
     */
    protected registerApp(appCode: string, target: HTMLIFrameElement): void;
    /**
     * @description cancel registry
     */
    unRegisterApp(appCode: string): void;
    /**
     * @description get app state
     */
    protected getState(microAppCode: string): any;
    /**
     * @description set app state
     */
    protected setState(microAppCode: string, state: any): WeakMap<HTMLIFrameElement, any> | undefined;
    /**
     * @description pass message
     */
    private _passive;
    /**
     * @private
     * @description 默认注册事件
     * @returns
     */
    private _maintainRegister;
    protected _isRootContext(): boolean;
}
