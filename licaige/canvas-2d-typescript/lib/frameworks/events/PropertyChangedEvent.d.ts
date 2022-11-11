import { CoreEvent, IEventDispatcher } from "../components/Core";
export declare class PropertyChangedEvent extends CoreEvent {
    propertyKey: string;
    oldValue: any;
    newValue: any;
    constructor(target: IEventDispatcher, propertyKey: string, oldValue: any, newValue: any);
    static NAME: string;
}
//# sourceMappingURL=PropertyChangedEvent.d.ts.map