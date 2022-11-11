import { CoreEvent, IEventDispatcher } from "../components/Core";

export class PropertyChangedEvent extends CoreEvent {
    public propertyKey: string;
    public oldValue: any;
    public newValue: any;

    constructor(target: IEventDispatcher, propertyKey: string, oldValue: any, newValue: any) {
        super(target, PropertyChangedEvent.NAME);
        this.propertyKey = propertyKey;
        this.oldValue = oldValue;
        this.newValue = newValue;
    }

    public static NAME: string = "PropertyChangedEvent";
}
