export class Observer {
    constructor(target, notifyMethod, notifyContext) {
        this.target = target;
        this.notify = notifyMethod;
        this.context = notifyContext;
    }
    setNotifyMethod(notifyMethod) {
        this.notify = notifyMethod;
    }
    setNotifyContext(notifyContext) {
        this.context = notifyContext;
    }
    notifyObserver(notification) {
        this.notify.apply(this.target, [notification]);
    }
    compareNotifyContext(object) {
        return object == this.context;
    }
}
export class Notifier {
    constructor() {
        this.sendNotification = (notificationName, body = null, type = null) => { };
    }
    get facade() {
        return Facade.getInstance();
    }
}
export class Notification {
    constructor(name, body = null, type = null) {
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
    setBody(body) {
        this.body = body;
    }
    setType(type) {
        this.type = type;
    }
}
export class Mediator extends Notifier {
    constructor(mediatorName, viewComponent = null) {
        super();
        this.mediatorName = mediatorName;
        this.viewComponent = viewComponent;
    }
    getMediatorName() {
        return this.mediatorName;
    }
    getViewComponent() {
        return this.viewComponent;
    }
    setViewComponent(viewComponent) {
        this.viewComponent = viewComponent;
    }
    listNotificationInterests() {
        return [];
    }
    handleNotification(note) { }
    onRegister() { }
    onRemove() { }
}
Mediator.NAME = "Mediator";
const INSTANCE_MSG = "singleton already constructed!";
export class Model {
    constructor() {
        if (Model.instance) {
            throw Error(INSTANCE_MSG);
        }
        Model.instance = this;
        this.proxyMap = new Map();
        this.initializeModel();
    }
    initializeModel() { }
    registerProxy(proxy) {
        this.proxyMap[proxy.getProxyName()] = proxy;
        proxy.onRegister();
    }
    retrieveProxy(proxyName) {
        return this.proxyMap.get(proxyName);
    }
    hasProxy(proxyName) {
        return this.proxyMap.has(proxyName);
    }
    removeProxy(proxyName) {
        let proxy = this.proxyMap.get(proxyName);
        if (proxy) {
            this.proxyMap.delete(proxyName);
            proxy.onRemove();
        }
        return proxy;
    }
    static getInstance() {
        if (Model.instance == null) {
            Model.instance = new Model();
        }
        return Model.instance;
    }
}
class View {
    constructor() {
        this.mediatorMap = new Map();
        this.observerMap = new Map();
    }
    initializeView() { }
    registerObserver(notificationName, observer) {
        let observers = this.observerMap.get(notificationName);
        if (observers) {
            observers.push(observer);
        }
        else {
            this.observerMap.set(notificationName, [observer]);
        }
    }
    notifyObservers(notification) {
        if (this.observerMap.has(notification.getName())) {
            let observers = this.observerMap.get(notification.getName());
            observers.forEach((observer) => {
                observer.notifyObserver(notification);
            });
        }
    }
    removeObserver(notificationName, notifyContext) {
        let observers = this.observerMap.get(notificationName);
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
    registerMediator(mediator) {
        if (this.hasMediator(mediator.getMediatorName())) {
            return;
        }
        this.mediatorMap[mediator.getMediatorName()] = mediator;
        let intersets = mediator.listNotificationInterests();
        if (intersets.length > 0) {
            let observer = new Observer(mediator, mediator.handleNotification, mediator);
            intersets.forEach((interset) => {
                this.registerObserver(interset, observer);
            });
        }
        mediator.onRegister();
    }
    retrieveMediator(mediatorName) {
        return this.mediatorMap.get(mediatorName);
    }
    removeMediator(mediatorName) {
        let mediator = this.mediatorMap.get(mediatorName);
        if (mediator) {
            let intersets = mediator.listNotificationInterests();
            intersets.forEach((interset) => {
                this.removeObserver(interset, mediator);
            });
            this.mediatorMap.delete(mediatorName);
            mediator.onRemove();
        }
        return mediator;
    }
    hasMediator(mediatorName) {
        return this.mediatorMap.has(mediatorName);
    }
    static getInstance() {
        if (View.instance == null) {
            View.instance = new View();
        }
        return View.instance;
    }
}
export class Controller {
    constructor() {
        if (Controller.instance) {
            throw Error(INSTANCE_MSG);
        }
        Controller.instance = this;
        this.commandMap = new Map();
        this.initializeController();
    }
    get view() {
        return View.getInstance();
    }
    initializeController() { }
    registerCommand(noteName, commandClass) {
        if (!this.hasCommand(noteName)) {
            this.view.registerObserver(noteName, new Observer(this, this.executeCommand, this));
        }
        this.commandMap.set(noteName, commandClass);
    }
    removeCommand(noteName) {
        if (this.hasCommand(noteName)) {
            this.view.removeObserver(noteName, this);
            this.commandMap.delete(noteName);
        }
    }
    hasCommand(noteName) {
        return this.commandMap.has(noteName);
    }
    executeCommand(note) {
        let commandClass = this.commandMap.get(note.getName());
        if (!commandClass)
            return;
        let command = Reflect.construct(commandClass, []);
        command.execute(note);
    }
    static getInstance() {
        if (Controller.instance == null) {
            Controller.instance = new Controller();
        }
        return Controller.instance;
    }
}
export class Facade {
    constructor() {
        if (Facade.instance) {
            throw Error(INSTANCE_MSG);
        }
        Facade.instance = this;
        this.initializeFacade();
    }
    get controller() {
        return Controller.getInstance();
    }
    get model() {
        return Model.getInstance();
    }
    get view() {
        return View.getInstance();
    }
    initializeFacade() {
        this.initializeMode();
        this.initializeController();
        this.initializeView();
    }
    initializeController() { }
    initializeMode() { }
    initializeView() { }
    registerCommand(noteName, commandClass) {
        this.controller.registerCommand(noteName, commandClass);
    }
    removeCommand(noteName) {
        this.controller.removeCommand(noteName);
    }
    hasCommand(noteName) {
        return this.controller.hasCommand(noteName);
    }
    registerProxy(proxy) {
        this.model.registerProxy(proxy);
    }
    retrieveProxy(proxyName) {
        return this.model.retrieveProxy(proxyName);
    }
    removeProxy(proxyName) {
        let proxy = null;
        if (this.model) {
            proxy = this.model.removeProxy(proxyName);
        }
        return proxy;
    }
    hasProxy(proxyName) {
        return this.model.hasProxy(proxyName);
    }
    registerMediator(mediator) {
        if (this.view) {
            this.view.registerMediator(mediator);
        }
    }
    retrieveMediator(mediatorName) {
        return this.view.retrieveMediator(mediatorName);
    }
    removeMediator(mediatorName) {
        let mediator = null;
        if (this.view) {
            mediator = this.view.removeMediator(mediatorName);
        }
        return mediator;
    }
    hasMediator(mediatorName) {
        return this.view.hasMediator(mediatorName);
    }
    sendNotification(noteName, body, type) {
        this.notifyObservers(new Notification(noteName, body, type));
    }
    notifyObservers(note) {
        if (this.view) {
            this.view.notifyObservers(note);
        }
    }
    static getInstance() {
        if (Facade.instance == null) {
            Facade.instance = new Facade();
        }
        return Facade.instance;
    }
}
Facade.instance = undefined;
export class Proxy {
    constructor(proxyName = null, data = null) {
        this.proxyName = proxyName || Proxy.NAME;
        this.data = data;
    }
    getProxyName() {
        return this.proxyName;
    }
    getData() {
        return this.data;
    }
    setData(data) {
        this.data = data;
    }
    onRegister() { }
    onRemove() { }
}
Proxy.NAME = "Proxy";
export class SimpleCommand extends Notifier {
    execute(note) { }
}
export class MacroCommand extends Notifier {
    constructor() {
        super();
        this.subCommand = new Array();
        this.initializeMacroCommand();
    }
    initializeMacroCommand() { }
    addSubCommand(commandClass) {
        this.subCommand.push(commandClass);
    }
    execute(note) {
        while (this.subCommand.length > 0) {
            let commandClass = this.subCommand.shift();
            let command = Reflect.construct(commandClass, []);
            command.execute(note);
        }
    }
}
//# sourceMappingURL=PureMVC.js.map