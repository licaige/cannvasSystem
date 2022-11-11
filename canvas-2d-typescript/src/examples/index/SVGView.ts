import { Component } from '../../frameworks/components/Component';
import { Graphics } from '../../frameworks/components/Core';
import { InvalidateProperties } from '../../frameworks/components/DisplayObject';
import { Timer } from '../../frameworks/components/Timer';
import { TimerEvent } from '../../frameworks/events/TimerEvent';

interface SvgImage {
    section: string;
    warning: string;
    jump: boolean;
    dom: SVGImageElement;
}

export class SVGView extends Component {
    private imageSource: CanvasImageSource;
    private imageMap: Map<string, SvgImage>;
    private sectionMap: Map<string, string>;

    constructor() {
        super();

        this.imageMap = new Map();
        this.sectionMap = new Map();
    }

    private loadSections(): void {
        let map = this.sectionMap;
        const img2base64 = (img) => {
            let canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            let ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, img.width, img.height);
            return canvas.toDataURL('image/png');
        };
        ['STATION', 'TRAIN', 'PCAS', 'TRANSFER'].forEach((name) => {
            ['GN', 'GY', 'YE', 'RD'].forEach((warn) => {
                let url = `/svg/line/LINEICON/${name}_${warn}.png`;
                let img = new Image();
                img.onload = function () {
                    let base64data = img2base64(img);
                    map.set(`${name}_${warn}`, base64data);
                };
                img.src = url;
            });
        });
    }

    public updateSVGImageHref(): void {
        this.imageMap.forEach((image, id) => {
            image.jump = !image.jump;
            let warning = image.warning;
            //  let warning = image.warning == "GN" || image.warning == "GY"
            //  ? image.warning
            //  : image.jump ? image.warning : "GY";
            let key = `${image.section}_${warning}`;
            if (this.sectionMap.has(key)) {
                image.dom.setAttribute('xlink:href', this.sectionMap.get(key));
            }
        });

        let self = this,
            iframe = document.getElementsByTagName('iframe')[0];
        if (iframe) {
            let svg = iframe.contentWindow.document.getElementsByTagName('svg')[0];

            if (svg) {
                let outerHTML = svg.outerHTML,
                    url = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(outerHTML))),
                    img = new Image();
                img.onload = function () {
                    self.setImageSource(img);
                };
                img.src = url;
            }
        }
    }

    onComplete(): void {
        this.loadSections();

        let self = this;
        let iframe = document.createElement('iframe');
        iframe.onload = function () {
            let svg = iframe.contentWindow.document.getElementsByTagName('svg')[0];
            let texts = svg.getElementsByTagName('text');
            // 修改站名字体颜色
            for (let i = 0; i < texts.length; i++) {
                let txt = texts[i];
                if (txt.outerHTML.indexOf('st0') >= 0) {
                    txt.setAttribute('fill', '#FFFFFF');
                }
            }

            let imgs = svg.getElementsByTagName('image');
            for (let i = 0; i < imgs.length; i++) {
                let href = imgs[i].getAttribute('xlink:href'),
                    name = href.substr(href.lastIndexOf('/') + 1, href.indexOf('.png') - href.lastIndexOf('/') - 1),
                    arr = name.split('_');

                self.imageMap.set(imgs[i].id, { section: arr[0], warning: arr[1], dom: imgs[i], jump: false });
            }

            self.updateSVGImageHref();
        };
        iframe.src = '/svg/line/line.svg?_t=' + Math.random(); //'http://172.19.88.169:8080/svg/line/line.svg';
        iframe.style.position = 'absolute';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        document.body.appendChild(iframe);

        // let timer = new Timer();
        // timer.on(TimerEvent.NAME, () => {
        //     this.updateSVGImageHref();
        // });
        // timer.start({ delay: 1000 });
    }

    paint(g: Graphics) {
        const { width, height } = this.innerBound;
        if (!this.imageSource) return;
        const W = 708,
            H = 580;
        let flag = width / height < W / H;
        let w = flag ? width : (height * W) / H;
        let h = flag ? (width * H) / W : height;
        g.drawImage(this.imageSource, (width - w) / 2, (height - h) / 2, w, h);
    }

    public getImageSource(): CanvasImageSource {
        return this.imageSource;
    }
    @InvalidateProperties
    public setImageSource(imgSrc: CanvasImageSource) {
        this.imageSource = imgSrc;
    }
    public setNodeWarning(id: string, warning: string) {
        if (!this.imageMap.has(id)) return;
        this.imageMap.get(id).warning = warning;
    }
}
