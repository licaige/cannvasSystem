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

type CommandClass = Function;

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

export class Observer implements IObserver {
    private target:Object;
    private notify: Function;
    private context: Object;

    constructor(target:Object, notifyMethod: Function, notifyContext: Object) {
        this.target = target;
        this.notify  = notifyMethod;
        this.context = notifyContext;
    }

    setNotifyMethod(notifyMethod: Function) {
        this.notify = notifyMethod;
    }

    setNotifyContext(notifyContext: Object) {
        this.context = notifyContext;
    }

    notifyObserver(notification: INotification): void {
        this.notify.apply(this.target, [notification]);
    }

    compareNotifyContext(object: Object): boolean {
        return object == this.context;
    }
}

export class Notifier implements INotifier {
    sendNotification = (notificationName: string, body: Object = null, type: string = null): void => {};

    public get facade(): IFacade {
        return Facade.getInstance();
    }
}

export class Notification implements INotification {
    private name: string;
    private body: Object;
    private type: string;

    constructor(name: string, body: Object = null, type: string = null) {
        this.name = name;
        this.body = body;
        this.type = type;
    }

    getName() {
        return this.name;
    }
    getBody() {
        return this.body;
    }
    getType() {
        return this.type;
    }

    setBody(body: Object) {
        this.body = body;
    }
    setType(type: string) {
        this.type = type;
    }
}

export class Mediator extends Notifier implements IMediator, INotifier {
    public static NAME: string = "Mediator";
    private mediatorName: string;
    private viewComponent: Object;
    constructor(mediatorName: string, viewComponent: Object = null) {
        super();
        this.mediatorName = mediatorName;
        this.viewComponent = viewComponent;
    }

    getMediatorName(): string {
        return this.mediatorName;
    }

    getViewComponent(): Object {
        return this.viewComponent;
    }

    setViewComponent(viewComponent: Object): void {
        this.viewComponent = viewComponent;
    }

    listNotificationInterests(): Array<string> {
        return [];
    }

    handleNotification(note: INotification): void {}

    onRegister(): void {}

    onRemove(): void {}
}

const INSTANCE_MSG = "singleton already constructed!";

export class Model implements IModel {
    private proxyMap: Map<string, IProxy>;
    constructor() {
        if (Model.instance) {
            throw Error(INSTANCE_MSG);
        }
        Model.instance = this;
        this.proxyMap = new Map();
        this.initializeModel();
    }

    protected initializeModel(): void {}

    registerProxy(proxy: IProxy): void {
        this.proxyMap[proxy.getProxyName()] = proxy;
        proxy.onRegister();
    }

    retrieveProxy(proxyName: string): IProxy {
        return this.proxyMap.get(proxyName);
    }

    hasProxy(proxyName: string): boolean {
        return this.proxyMap.has(proxyName);
    }

    removeProxy(proxyName: string): IProxy {
        let proxy: IProxy = this.proxyMap.get(proxyName);
        if (proxy) {
            this.proxyMap.delete(proxyName);
            proxy.onRemove();
        }
        return proxy;
    }

    public static getInstance(): IModel {
        if (Model.instance == null) {
            Model.instance = new Model();
        }
        return Model.instance;
    }

    private static instance: IModel;
}

class View implements IView {
    protected mediatorMap: Map<string, IMediator>;
    protected observerMap: Map<string, Array<IObserver>>;

    constructor() {
        this.mediatorMap = new Map();
        this.observerMap = new Map();
    }

    protected initializeView(): void {}

    registerObserver(notificationName: string, observer: IObserver): void {
        let observers: Array<IObserver> = this.observerMap.get(notificationName);
        if (observers) {
            observers.push(observer);
        } else {
            this.observerMap.set(notificationName, [observer]);
        }
    }

    notifyObservers(notification: INotification): void {
        if (this.observerMap.has(notification.getName())) {
            let observers: Array<IObserver> = this.observerMap.get(notification.getName());
            observers.forEach((observer) => {
                observer.notifyObserver(notification);
            });
        }
    }

    removeObserver(notificationName: string, notifyContext: Object): void {
        let observers: Array<IObserver> = this.observerMap.get(notificationName);
        for (let i = 0; i < observers.length; i++) {
            if (observers[i].compareNotifyContext(notifyContext)) {
                observers.splice(i, 1);
                break;
            }
        }
        if (observers.length == 0) {
            this.observerMap.delete(notificationName);
        }
    }

    registerMediator(mediator: IMediator): void {
        if (this.hasMediator(mediator.getMediatorName())) {
            return;
        }

        this.mediatorMap[mediator.getMediatorName()] = mediator;
        let intersets: Array<string> = mediator.listNotificationInterests();
        if (intersets.length > 0) {
            let observer: Observer = new Observer(mediator, mediator.handleNotification, mediator);

            intersets.forEach((interset) => {
                this.registerObserver(interset, observer);
            });
        }

        mediator.onRegister();
    }

    retrieveMediator(mediatorName: string): IMediator {
        return this.mediatorMap.get(mediatorName);
    }

    removeMediator(mediatorName: string): IMediator {
        let mediator: IMediator = this.mediatorMap.get(mediatorName);
        if (mediator) {
            let intersets: Array<string> = mediator.listNotificationInterests();

            intersets.forEach((interset) => {
                this.removeObserver(interset, mediator);
            });

            this.mediatorMap.delete(mediatorName);
            mediator.onRemove();
        }
        return mediator;
    }

    hasMediator(mediatorName: string): boolean {
        return this.mediatorMap.has(mediatorName);
    }

    public static getInstance(): IView {
        if (View.instance == null) {
            View.instance = new View();
        }

        return View.instance;
    }
    private static instance: IView;
}

export class Controller implements IController {
    protected commandMap: Map<string, CommandClass>;

    constructor() {
        if (Controller.instance) {
            throw Error(INSTANCE_MSG);
        }

        Controller.instance = this;
        this.commandMap = new Map();
        this.initializeController();
    }

    protected get view(): IView {
        return View.getInstance();
    }

    protected initializeController(): void {}

    registerCommand(noteName: string, commandClass: CommandClass): void {
        if (!this.hasCommand(noteName)) {
            this.view.registerObserver(noteName, new Observer(this, this.executeCommand, this));
        }
        this.commandMap.set(noteName, commandClass);
    }

    removeCommand(noteName: string): void {
        if (this.hasCommand(noteName)) {
            this.view.removeObserver(noteName, this);
            this.commandMap.delete(noteName);
        }
    }

    hasCommand(noteName: string): boolean {
        return this.commandMap.has(noteName);
    }

    executeCommand(note: INotification): void {
        let commandClass: CommandClass = this.commandMap.get(note.getName());
        if (!commandClass) return;

        let command: ICommand = Reflect.construct(commandClass, []);
        command.execute(note);
    }

    public static getInstance(): IController {
        if (Controller.instance == null) {
            Controller.instance = new Controller();
        }
        return Controller.instance;
    }
    private static instance: IController;
}

export class Facade implements IFacade {
    constructor() {
        if (Facade.instance) {
            throw Error(INSTANCE_MSG);
        }
        Facade.instance = this;
        this.initializeFacade();
    }
    protected get controller(): IController {
        return Controller.getInstance();
    }
    protected get model(): IModel {
        return Model.getInstance();
    }
    protected get view(): IView {
        return View.getInstance();
    }

    protected initializeFacade(): void {
        this.initializeMode();
        this.initializeController();
        this.initializeView();
    }

    protected initializeController(): void {}

    protected initializeMode(): void {}

    protected initializeView(): void {}

    registerCommand(noteName: string, commandClass: CommandClass): void {
        this.controller.registerCommand(noteName, commandClass);
    }

    removeCommand(noteName: string): void {
        this.controller.removeCommand(noteName);
    }

    hasCommand(noteName: string): boolean {
        return this.controller.hasCommand(noteName);
    }

    registerProxy(proxy: IProxy): void {
        this.model.registerProxy(proxy);
    }

    retrieveProxy(proxyName: string): IProxy {
        return this.model.retrieveProxy(proxyName);
    }

    removeProxy(proxyName: string): IProxy {
        let proxy: IProxy = null;
        if (this.model) {
            proxy = this.model.removeProxy(proxyName);
        }
        return proxy;
    }

    hasProxy(proxyName: string): boolean {
        return this.model.hasProxy(proxyName);
    }

    registerMediator(mediator: IMediator): void {
        if (this.view) {
            this.view.registerMediator(mediator);
        }
    }

    retrieveMediator(mediatorName: string): IMediator {
        return this.view.retrieveMediator(mediatorName);
    }

    removeMediator(mediatorName: string): IMediator {
        let mediator: IMediator = null;
        if (this.view) {
            mediator = this.view.removeMediator(mediatorName);
        }
        return mediator;
    }

    hasMediator(mediatorName: string): boolean {
        return this.view.hasMediator(mediatorName);
    }

    sendNotification(noteName: string, body?: Object, type?: string): void {
        this.notifyObservers(new Notification(noteName, body, type));
    }

    notifyObservers(note: INotification) {
        if (this.view) {
            this.view.notifyObservers(note);
        }
    }

    public static getInstance(): IFacade {
        if (Facade.instance == null) {
            Facade.instance = new Facade();
        }
        return Facade.instance;
    }
    private static instance: Facade = undefined;
}

export class Proxy implements IProxy {
    public static NAME: string = "Proxy";

    private data: Object;
    private proxyName: string;

    constructor();
    constructor(proxyName: string);
    constructor(proxyName: string = null, data: Object = null) {
        this.proxyName = proxyName || Proxy.NAME;
        this.data = data;
    }

    getProxyName(): string {
        return this.proxyName;
    }

    getData(): Object {
        return this.data;
    }

    setData(data: Object): void {
        this.data = data;
    }

    onRegister(): void {}
    onRemove(): void {}
}

export class SimpleCommand extends Notifier implements ICommand, INotifier {
    execute(note: INotification): void {}
}

export class MacroCommand extends Notifier implements ICommand, INotifier {
    private subCommand: Array<CommandClass>;
    constructor() {
        super();
        this.subCommand = new Array();
        this.initializeMacroCommand();
    }

    protected initializeMacroCommand(): void {}

    protected addSubCommand(commandClass: CommandClass): void {
        this.subCommand.push(commandClass);
    }

    execute(note: INotification): void {
        while (this.subCommand.length > 0) {
            let commandClass: CommandClass = this.subCommand.shift();
            let command: ICommand = Reflect.construct(commandClass, []);
            command.execute(note);
        }
    }
}
