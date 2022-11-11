import 'reflect-metadata';
export interface ConstructableFunction extends Function {
    new (...args: any[]): any;
}
declare function Instance(target: ConstructableFunction): void;
declare function Inject(target: Object, propertyKey: string | symbol): void;
export { Instance, Inject };
//# sourceMappingURL=Core.d.ts.map