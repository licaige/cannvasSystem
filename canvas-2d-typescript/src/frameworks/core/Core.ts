import 'reflect-metadata';

export interface ConstructableFunction extends Function {
    new (...args: any[]): any;
}

const instanceKey = Symbol('__service_instance__');

// 自定义 id 初始化
function Instance(target: ConstructableFunction) {
    let id = Symbol(target.name);
    let instance = Reflect.construct(target, []);
    // Cache.set(id, Reflect.construct(target, []));
    Reflect.defineMetadata(instanceKey, instance, target);
}

function Inject(target: Object, propertyKey: string | symbol) {
    const Dependency = Reflect.getMetadata('design:type', target, propertyKey);
    const instance = Reflect.getMetadata(instanceKey, Dependency);

    Reflect.defineProperty(target, propertyKey, {
        value: instance,
    });
}

export { Instance, Inject };
