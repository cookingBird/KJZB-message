declare const _default: import("vue").DefineComponent<{
    src: {
        type: StringConstructor;
        required: true;
    };
    microAppCode: {
        type: StringConstructor;
        required: true;
    };
    state: ObjectConstructor;
    query: ObjectConstructor;
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    [x: string]: (data: any, responsor: (d: any) => void, msg: any) => void;
    load: () => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    src: {
        type: StringConstructor;
        required: true;
    };
    microAppCode: {
        type: StringConstructor;
        required: true;
    };
    state: ObjectConstructor;
    query: ObjectConstructor;
}>> & {
    [x: `on${Capitalize<any>}`]: ((data: any, responsor: (d: any) => void, msg: any) => any) | undefined;
}, {}, {}>;
export default _default;
