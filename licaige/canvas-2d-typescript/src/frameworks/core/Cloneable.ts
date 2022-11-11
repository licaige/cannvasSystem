import "reflect-metadata";

export function CloneableDescriptor<TFunction extends { new (...args: any[]): {} }>(constructor: TFunction) {
    return class extends constructor implements Cloneable<TFunction> {
        clone(): any {
            return Reflect.construct(this.constructor, [this]);
        }
    };
}

export interface Cloneable<T> {
    clone(): T;
}

export const Desc = (target) => {
    
};

// function metadata(
//     metadataKey: any,
//     metadataValue: any
// ): {
//     (target: Function): void;
//     (target: Object, propertyKey: string | symbol): void;
// };
