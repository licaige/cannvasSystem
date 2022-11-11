import { BorderStyle } from '../types/BorderStyle';
import { Padding } from '../types/Padding';
import { Container } from './Container';
export class Application extends Container {
    constructor(canvas = document.createElement('canvas')) {
        super();
        if (Application._instance)
            throw Error('singleton already constructed!');
        Application._instance = this;
        this.addedToStage = false;
        // let svg = document.getElementById("lineSvg");
        // if (svg) {
        //     document.body.insertBefore(canvas, svg);
        // } else {
        document.body.appendChild(canvas);
        // }
        this.graphics = canvas.getContext('2d');
        this.graphics.renderer = this;
        const { innerWidth, innerHeight } = window;
        this.graphics.canvas.width = innerWidth;
        this.graphics.canvas.height = innerHeight;
        this.setWidth(innerWidth);
        this.setHeight(innerHeight);
        this.setBorder(new BorderStyle({ enable: false, size: 0 }));
        this.setMargin(new Padding({ top: 0, bottom: 0, left: 0, right: 0 }));
        this.setPadding(new Padding({ top: 0, bottom: 0, left: 0, right: 0 }));
    }
    onPaint() {
        const { width, height } = this.outerBound;
        let g = this.graphics;
        g.clearRect(0, 0, width, height);
        super.onPaint();
    }
    initializeListeners() {
        super.initializeListeners();
        const resize = () => {
            const { innerWidth, innerHeight } = window;
            this.graphics.canvas.width = innerWidth;
            this.graphics.canvas.height = innerHeight;
            this.setWidth(innerWidth);
            this.setHeight(innerHeight);
        };
        window.addEventListener('resize', resize, false);
    }
    get mouseEnabled() {
        return true;
    }
    static get instance() {
        return Application._instance;
    }
    complete() {
        if (this.addedToStage)
            return true;
        this.addedToStage = true;
        return super.complete();
    }
}
Application._instance = null;
//# sourceMappingURL=Application.js.map