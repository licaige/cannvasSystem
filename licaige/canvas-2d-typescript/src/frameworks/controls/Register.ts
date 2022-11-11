import { Application } from '../components/Application';

export interface Register {
    enable(): void;
}
export abstract class Register {
    constructor() {
        const frame = () => {
            if (Application.instance) {
                this.enable();
            } else {
                setTimeout(frame);
            }
        };
        setTimeout(frame);
    }

    get dom(): HTMLCanvasElement {
        return this.application.graphics.canvas;
    }

    get application(): Application {
        return Application.instance;
    }

    public static register(controlClass: Function): void {
        Reflect.construct(controlClass, []);
    }
}
