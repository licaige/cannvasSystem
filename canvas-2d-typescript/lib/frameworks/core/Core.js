import 'reflect-metadata';
const instanceKey = Symbol('__service_instance__');
// 自定义 id 初始化
function Instance(target) {
    let id = Symbol(target.name);
    let instance = Reflect.construct(target, []);
    // Cache.set(id, Reflect.construct(target, []));
    Reflect.defineMetadata(instanceKey, instance, target);
}
function Inject(target, propertyKey) {
    const Dependency = Reflect.getMetadata('design:type', target, propertyKey);
    const instance = Reflect.getMetadata(instanceKey, Dependency);
    Reflect.defineProperty(target, propertyKey, {
        value: instance,
    });
}
export { Instance, Inject };
//# sourceMappingURL=Core.js.map