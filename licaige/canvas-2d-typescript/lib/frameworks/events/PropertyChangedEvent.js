import { CoreEvent } from "../components/Core";
export class PropertyChangedEvent extends CoreEvent {
    constructor(target, propertyKey, oldValue, newValue) {
        super(target, PropertyChangedEvent.NAME);
        this.propertyKey = propertyKey;
        this.oldValue = oldValue;
        this.newValue = newValue;
    }
}
PropertyChangedEvent.NAME = "PropertyChangedEvent";
//# sourceMappingURL=PropertyChangedEvent.js.map