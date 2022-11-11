import "reflect-metadata";
export function CloneableDescriptor(constructor) {
    return class extends constructor {
        clone() {
            return Reflect.construct(this.constructor, [this]);
        }
    };
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
//# sourceMappingURL=Cloneable.js.map