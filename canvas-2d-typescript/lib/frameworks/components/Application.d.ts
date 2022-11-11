import { Container } from './Container';
export declare abstract class Application extends Container {
    private addedToStage;
    constructor(canvas?: HTMLCanvasElement);
    onPaint(): void;
    initializeListeners(): void;
    protected get mouseEnabled(): boolean;
    private static _instance;
    static get instance(): Application;
    complete(): boolean;
}
//# sourceMappingURL=Application.d.ts.map