import { IComponent } from './Core';
import { Application } from './Application';

class GraphicsManager {
    private renderers: Array<IComponent>;

    private get app():Application
    {
        return Application.instance;
    }

    constructor() {
        this.renderers = [];

        // const refresh = () => {
        //     this.app.onPaint();
        //     requestAnimationFrame(refresh);
        // };
        // requestAnimationFrame(refresh);
    }

    public render(renderer: IComponent): void {
        // renderer.graphics.renderer.onPaint();
        // this.renderers = this.renderers.filter((c) => !renderer.contains(c));
        // let exist: boolean = false;
        // this.renderers.every((c) => {
        //     if (c.contains(renderer)) {
        //         exist = true;
        //         return false;
        //     }
        //     return true;
        // });

        // if (!exist) {
        //     this.renderers.push(renderer);
        // }
    }

    private static _instance: GraphicsManager;
    static get graphicsManager(): GraphicsManager {
        if (!GraphicsManager._instance) {
            GraphicsManager._instance = new GraphicsManager();
        }
        return GraphicsManager._instance;
    }
}

let graphicsManager = GraphicsManager.graphicsManager;
export { graphicsManager };
