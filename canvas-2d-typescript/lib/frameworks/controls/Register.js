import { Application } from '../components/Application';
export class Register {
    constructor() {
        const frame = () => {
            if (Application.instance) {
                this.enable();
            }
            else {
                setTimeout(frame);
            }
        };
        setTimeout(frame);
    }
    get dom() {
        return this.application.graphics.canvas;
    }
    get application() {
        return Application.instance;
    }
    static register(controlClass) {
        Reflect.construct(controlClass, []);
    }
}
//# sourceMappingURL=Register.js.map