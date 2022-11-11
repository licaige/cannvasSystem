import { Application } from '../components/Application';
export interface Register {
    enable(): void;
}
export declare abstract class Register {
    constructor();
    get dom(): HTMLCanvasElement;
    get application(): Application;
    static register(controlClass: Function): void;
}
//# sourceMappingURL=Register.d.ts.map