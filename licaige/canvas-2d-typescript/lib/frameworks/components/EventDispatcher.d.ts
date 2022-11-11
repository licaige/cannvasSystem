import { IEventDispatcher, CoreEvent } from "./Core";
declare class ListenerHolder extends Array<(event: CoreEvent) => void> {
    trigger(event?: CoreEvent): boolean;
}
export declare class EventDispatcher implements IEventDispatcher {
    private _id;
    constructor();
    listeners: Map<string, ListenerHolder>;
    trigger(event?: CoreEvent): IEventDispatcher;
    has(type: string, listener?: (event: CoreEvent) => void): boolean;
    on(type: string, listener: (event: CoreEvent) => void): IEventDispatcher;
    off(type: string, listener?: (event: CoreEvent) => void): IEventDispatcher;
    get id(): number;
}
export {};
//# sourceMappingURL=EventDispatcher.d.ts.map