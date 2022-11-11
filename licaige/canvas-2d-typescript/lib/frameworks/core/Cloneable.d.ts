import "reflect-metadata";
export declare function CloneableDescriptor<TFunction extends {
    new (...args: any[]): {};
}>(constructor: TFunction): {
    new (...args: any[]): {
        clone(): any;
    };
} & TFunction;
export interface Cloneable<T> {
    clone(): T;
}
export declare const Desc: (target: any) => void;
//# sourceMappingURL=Cloneable.d.ts.map