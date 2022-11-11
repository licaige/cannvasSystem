export interface INotification {
    getName(): string;
    getBody(): Object;
    setBody(obj: Object): void;
    getType(): string;
    setType(t: string): void;
}
export interface ICommand {
    execute(notification: INotification): void;
}
declare type CommandClass = Function;
export interface IProxy {
    getProxyName(): string;
    getData(): Object;
    setData(data: Object): void;
    onRegister(): void;
    onRemove(): void;
}
export interface INotifier {
    sendNotification(notificationName: string, body?: Object, type?: string): void;
}
export interface IMediator {
    getMediatorName(): string;
    getViewComponent(): Object;
    setViewComponent(viewComponent: Object): void;
    listNotificationInterests(): Array<string>;
    handleNotification(notification: INotification): void;
    onRegister(): void;
    onRemove(): void;
}
export interface IFacade extends INotifier {
    registerProxy(proxy: IProxy): void;
    retrieveProxy(proxyName: string): IProxy;
    removeProxy(proxyName: string): IProxy;
    hasProxy(proxyName: string): boolean;
    registerCommand(notificationName: string, commandClass: CommandClass): void;
    removeCommand(notificationName: string): void;
    hasCommand(notificationName: string): boolean;
    registerMediator(mediator: IMediator): void;
    retrieveMediator(mediatorName: string): IMediator;
    removeMediator(mediatorName: string): IMediator;
    hasMediator(mediatorName: string): boolean;
    notifyObservers(note: INotification): void;
}
export interface IObserver {
    setNotifyMethod(notifyMethod: Function): void;
    setNotifyContext(notifyContext: Object): void;
    notifyObserver(notification: INotification): void;
    compareNotifyContext(object: Object): boolean;
}
export interface IModel {
    registerProxy(proxy: IProxy): void;
    retrieveProxy(proxyName: string): IProxy;
    removeProxy(proxyName: string): IProxy;
    hasProxy(proxyName: string): boolean;
}
export interface IView {
    registerObserver(notificationName: string, observer: IObserver): void;
    removeObserver(notificationName: string, notifyContext: Object): void;
    notifyObservers(note: INotification): void;
    registerMediator(mediator: IMediator): void;
    retrieveMediator(mediatorName: string): IMediator;
    removeMediator(mediatorName: string): IMediator;
    hasMediator(mediatorName: string): boolean;
}
export interface IController {
    registerCommand(notification: string, commandClass: CommandClass): void;
    executeCommand(notification: INotification): void;
    removeCommand(notification: string): void;
    hasCommand(notification: string): boolean;
}
export declare class Observer implements IObserver {
    private target;
    private notify;
    private context;
    constructor(target: Object, notifyMethod: Function, notifyContext: Object);
    setNotifyMethod(notifyMethod: Function): void;
    setNotifyContext(notifyContext: Object): void;
    notifyObserver(notification: INotification): void;
    compareNotifyContext(object: Object): boolean;
}
export declare class Notifier implements INotifier {
    sendNotification: (notificationName: string, body?: Object, type?: string) => void;
    get facade(): IFacade;
}
export declare class Notification implements INotification {
    private name;
    private body;
    private type;
    constructor(name: string, body?: Object, type?: string);
    getName(): string;
    getBody(): Object;
    getType(): string;
    setBody(body: Object): void;
    setType(type: string): void;
}
export declare class Mediator extends Notifier implements IMediator, INotifier {
    static NAME: string;
    private mediatorName;
    private viewComponent;
    constructor(mediatorName: string, viewComponent?: Object);
    getMediatorName(): string;
    getViewComponent(): Object;
    setViewComponent(viewComponent: Object): void;
    listNotificationInterests(): Array<string>;
    handleNotification(note: INotification): void;
    onRegister(): void;
    onRemove(): void;
}
export declare class Model implements IModel {
    private proxyMap;
    constructor();
    protected initializeModel(): void;
    registerProxy(proxy: IProxy): void;
    retrieveProxy(proxyName: string): IProxy;
    hasProxy(proxyName: string): boolean;
    removeProxy(proxyName: string): IProxy;
    static getInstance(): IModel;
    private static instance;
}
export declare class Controller implements IController {
    protected commandMap: Map<string, CommandClass>;
    constructor();
    protected get view(): IView;
    protected initializeController(): void;
    registerCommand(noteName: string, commandClass: CommandClass): void;
    removeCommand(noteName: string): void;
    hasCommand(noteName: string): boolean;
    executeCommand(note: INotification): void;
    static getInstance(): IController;
    private static instance;
}
export declare class Facade implements IFacade {
    constructor();
    protected get controller(): IController;
    protected get model(): IModel;
    protected get view(): IView;
    protected initializeFacade(): void;
    protected initializeController(): void;
    protected initializeMode(): void;
    protected initializeView(): void;
    registerCommand(noteName: string, commandClass: CommandClass): void;
    removeCommand(noteName: string): void;
    hasCommand(noteName: string): boolean;
    registerProxy(proxy: IProxy): void;
    retrieveProxy(proxyName: string): IProxy;
    removeProxy(proxyName: string): IProxy;
    hasProxy(proxyName: string): boolean;
    registerMediator(mediator: IMediator): void;
    retrieveMediator(mediatorName: string): IMediator;
    removeMediator(mediatorName: string): IMediator;
    hasMediator(mediatorName: string): boolean;
    sendNotification(noteName: string, body?: Object, type?: string): void;
    notifyObservers(note: INotification): void;
    static getInstance(): IFacade;
    private static instance;
}
export declare class Proxy implements IProxy {
    static NAME: string;
    private data;
    private proxyName;
    constructor();
    constructor(proxyName: string);
    getProxyName(): string;
    getData(): Object;
    setData(data: Object): void;
    onRegister(): void;
    onRemove(): void;
}
export declare class SimpleCommand extends Notifier implements ICommand, INotifier {
    execute(note: INotification): void;
}
export declare class MacroCommand extends Notifier implements ICommand, INotifier {
    private subCommand;
    constructor();
    protected initializeMacroCommand(): void;
    protected addSubCommand(commandClass: CommandClass): void;
    execute(note: INotification): void;
}
export {};
//# sourceMappingURL=PureMVC.d.ts.map