import { Message } from './Message';
import type { BaseMsg } from './Message';
export type PassiveMsg = {
    target: 'global' | 'main' | 'parent' | string;
    sourceCode: string;
    popSource: string;
    pop: boolean;
} & BaseMsg;
/**@type {Map<microAppCode,microAppContext>} */
export declare const microAppMap: Map<string, HTMLIFrameElement>;
/**
 * @typedef {Map<microAppContext,object>} IStateMap
 * @description 组件状态Map
 * @type {IStateMap}
 */
export declare const stateMap: Map<string, any>;
/**
 * @class Channel
 */
export declare class Channel extends Message {
    constructor(options?: {});
    /**
     * @description send or passive message
     */
    protected send<R = any>(target: Window | undefined, msg: Partial<PassiveMsg>): Promise<R>;
    /**
     * @description receive message
     */
    protected on(cb: (res: PassiveMsg) => void): import("../util").NOOP;
    /**
     * @description set current appcode and registry to parent window
     */
    protected setAppCode(val: string): void;
    /**
     * @description cancel registry
     */
    unRegisterApp(appCode: string): boolean;
    /**
     * @description get app
     */
    protected getApp(target: string): HTMLIFrameElement | null;
    /**
     * @description registry app
     */
    protected registerApp(appCode: string, target: HTMLIFrameElement): Map<string, HTMLIFrameElement>;
    /**
     * @description get app state
     */
    protected getState(microAppCode: string): any;
    /**
     * @description set app state
     */
    protected setState(microAppCode: string, state: any): Map<string, any>;
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
}
