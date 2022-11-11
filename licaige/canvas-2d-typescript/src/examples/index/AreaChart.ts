import { AbstractChart, RendererFunction, AxisData, Axis } from './Chart';
import { PropertyChangedEvent } from '../../frameworks/events/PropertyChangedEvent';
import { Serise } from './Chart';
import { TimerEvent } from '../../frameworks/events/TimerEvent';
import { Graphics, rgb } from '../../frameworks/components/Core';
import { Rectangle } from '../../frameworks/types/Rectangle';
import { BorderStyle } from '../../frameworks/types/BorderStyle';
import { FontStyle } from '../../frameworks/types/FontStyle';
import { ColorStyle } from '../../frameworks/types/ColorStyle';
import { Point } from '../../frameworks/types/Point';

const colors: Array<string> = [rgb(53, 214, 252), rgb(213, 217, 161)];
export class AreaChart extends AbstractChart {
    constructor() {
        super();
    }

    onComplete(): void {
        let yAxis = new Axis({
            name: '客流(人次)',
            border: new BorderStyle({ color: 'white', size: 1 }),
            label: new FontStyle({ color: rgb(255,255,158) }),
        });
        this.setYAxis(yAxis);
        let xAxis = new Axis({
            border: new BorderStyle({ color: 'white', size: 1 }),
            label: new FontStyle({ color: rgb(255,255,158) }),
            data: [
                '00:00',
                '01:00',
                '02:00',
                '03:00',
                '04:00',
                '05:00',
                '06:00',
                '07:00',
                '08:00',
                '09:00',
                '10:00',
                '11:00',
                '12:00',
                '13:00',
                '14:00',
                '15:00',
                '16:00',
                '17:00',
                '18:00',
                '19:00',
                '20:00',
                '21:00',
                '22:00',
                '23:00',
            ],
        });

        this.setXAxis(xAxis);
    }
    private numLines: number = 1;
    paint(g: Graphics) {
        let serise = this.getSerise(),
            xAxis = this.getXAxis();
        if (!serise || serise.length <= 0) return;

        const { width, height } = this.innerBound;
        const font = this.getFont();
        const fontSize = height * 0.05,
            top = (fontSize + 8) * 3 - 4,
            axisWidth: number = 1;

        this.generateMaxValue();
        let maxValue = this.maxValue;

        g.font = `${fontSize}px ${font.family} blod`;
        g.textBaseline = 'hanging';
        g.fillStyle = 'black';
        let metrix = g.measureText(String(maxValue));
        let left: number = Math.ceil(metrix.width) + 10,
            right = left;

        let columnWidth: number = (width - (left + 4) - (right + 4) + axisWidth) / (xAxis.data.length - 1) - axisWidth;

        let numLines: number = 1;
        xAxis.data.forEach((l) => {
            let mw = Math.ceil(g.measureText(String(l)).width);
            while (mw > columnWidth * numLines) {
                numLines++;
            }
        });
        this.numLines = numLines;
        let bottom = (fontSize + 8) * numLines;

        {
            const renderLegend = (x, y, height, name, color) => {
                g.save();
                g.fillStyle = color;
                g.beginPath();
                g.arc(x + height, y + height / 2, height / 2, 0, Math.PI * 2);
                g.fill();
                g.restore();

                let h = height / 4;
                g.save();
                g.beginPath();
                g.fillStyle = color;
                g.fillRect(x, y + height / 2 - h / 2, height * 2, h);
                g.restore();

                g.save();
                g.textBaseline = 'middle';
                g.textAlign = 'left';
                g.fillStyle = 'white';
                g.font = `${height}px ${font.family} blod`;
                g.fillText(name, x + height * 2.2, y + height / 2);
                g.restore();
            };

            // draw legend
            let w = width - left - right;
            let titleFontSize = fontSize * 1.2;
            let name = `${this.serise[0].name}`,
                name2 = `${this.serise[1].name}`;
            let titleWidth = g.measureText(name).width;
            let ww = titleWidth + titleFontSize * 2.5;
            let lw = left + w * 0.5 - ww * 0.5;
            let tw = lw - titleWidth * 0.5;

            renderLegend(tw, titleFontSize * 1.5, titleFontSize, name, colors[0]);
            renderLegend(tw + 200, titleFontSize * 1.5, titleFontSize, name2, colors[1]);
        }

        {
            // draw axis line
            let xx = Math.ceil(left + 4);
            let yy = Math.ceil(height - bottom);

            g.save();
            g.translate(0.5, 0.5);
            g.strokeStyle = this.yAxis.border.color;
            g.beginPath();
            g.moveTo(xx, top);
            g.lineTo(xx, yy);
            g.stroke();

            g.strokeStyle = this.xAxis.border.color;
            g.beginPath();
            g.moveTo(xx, yy);
            g.lineTo(width - right, yy);
            g.stroke();
            g.restore();
        }

        {
            // draw y axis
            let zero: number = 0,
                zeroY = 0,
                gap = maxValue / 5,
                gapHeight = (height - top - bottom) / 5;

            let yRenderer = this.yAxisRenderer;
            while (zero <= maxValue) {
                yRenderer(g, new Rectangle({ x: 0, y: height - bottom - zeroY, width: left, height: fontSize }), zero);
                zero += gap;
                zeroY += gapHeight;
            }

            // draw y axis unit
            g.font = `${fontSize}px ${font.family} blod`;
            g.textBaseline = 'bottom';
            g.textAlign = 'center';
            g.fillStyle = 'gray';
            g.fillText(this.yAxis.name, left, top - fontSize);
        }
        {
            // draw x axis and area line
            let x = left + 4,
                cGap = columnWidth * 0.25,
                axisHeight = (fontSize + 2) * numLines - 2;

            let xRenderer = this.xAxisRenderer;
            xAxis.data.forEach((name, index) => {
                xRenderer(g, new Rectangle({ x: x - columnWidth / 2, y: height - bottom, width: columnWidth, height: axisHeight }), name);
                x += columnWidth + axisWidth;
            });

            interface AreaChartData {
                color: string;
                lastX?: number;
                lastY: number;
                data: Array<Point>;
            }

            let datas: Array<AreaChartData> = [
                { color: colors[0], data: [], lastY: 0 },
                { color: colors[1], data: [], lastY: 0 },
            ];

            let dataMax = 0,
                diffX = columnWidth + axisWidth,
                diffY = 0;
            for (let j = 0; j < this.serise.length; j++) {
                x = left + 4;
                let s = this.serise[j],
                    yy = 0;
                for (let i = 0; i < xAxis.data.length; i++) {
                    if (i >= s.data.length) break;

                    let hh = (s.data[i] / maxValue) * (height - bottom - top);
                    yy = height - bottom - hh;
                    datas[j].lastX = x;
                    datas[j].lastY = yy;
                    datas[j].data.push({ x: x, y: yy });
                    x += diffX;
                }
            }

            const generateCtrlPoint = (p: Point, p1: Point, p2: Point): Point => {
                let a = (p1.y - p.y) / (p1.x - p.x),
                    a1 = (p2.y - p.y) / (p2.x - p.x),
                    a0 = -1 / a;
                let mp: Point = { x: (p.x + p1.x) / 2, y: (p.y + p1.y) / 2 };
                if (a == a1) return p;

                let b0 = mp.y - a0 * mp.x,
                    b1 = p2.y - a1 * p2.x;

                return { x: (b0 - b1) / (a1 - a0), y: (b0 * a1 - b1 * a0) / (a1 - a0) };
            };

            datas.forEach((cd) => {
                g.save();
                let fillStyle = g.createLinearGradient(0, cd.lastY, 0, height - bottom);
                fillStyle.addColorStop(0, cd.color);
                fillStyle.addColorStop(1, 'black');
                g.fillStyle = fillStyle;

                let scale = 0.1;
                cd.data.forEach((p, i) => {
                    if (i == 0) {
                        g.beginPath();
                        g.moveTo(p.x, p.y);
                        return;
                    }
                    let last1X = cd.data[i - 1].x,
                        last1Y = cd.data[i - 1].y,
                        last2X = i > 1 ? cd.data[i - 2].x : 0,
                        last2Y = i > 1 ? cd.data[i - 2].y : 0,
                        nowX = cd.data[i].x,
                        nowY = cd.data[i].y,
                        nextX = i < cd.data.length - 1 ? cd.data[i + 1].x : 0,
                        nextY = i < cd.data.length - 1 ? cd.data[i + 1].y : 0,
                        cAx = last1X + (nowX - last2X) * scale,
                        cAy = last1Y + (nowY - last2Y) * scale,
                        cBx = nowX - (nextX - last1X) * scale,
                        cBy = nowY - (nextY - last1Y) * scale;
                    if (i == 1) {
                        cAx = last1X + (nowX - 0) * scale;
                        cAy = last1Y + (nowY - cd.lastY) * scale;
                    } else if (i == cd.data.length - 1) {
                        cBx = nowX - (nowX - last1X) * scale;
                        cBy = nowY - (nowY - last1Y) * scale;
                    }
                    g.bezierCurveTo(cAx, cAy, cBx, cBy, nowX, nowY);
                });

                g.lineTo(cd.lastX, height - bottom);
                g.closePath();
                g.fill();
                g.restore();
            });

            datas.forEach((cd) => {
                g.save();
                let fillStyle = g.createLinearGradient(0, cd.lastY, 0, height - bottom);
                fillStyle.addColorStop(0, cd.color);
                fillStyle.addColorStop(1, 'black');
                g.fillStyle = fillStyle;

                let scale = 0.1;
                cd.data.forEach((p, i) => {
                    if (i == 0) {
                        g.beginPath();
                        g.moveTo(p.x, p.y);
                        return;
                    }
                    let last1X = cd.data[i - 1].x,
                        last1Y = cd.data[i - 1].y,
                        last2X = i > 1 ? cd.data[i - 2].x : -last1X,
                        last2Y = i > 1 ? cd.data[i - 2].y : last1Y,
                        nowX = p.x,
                        nowY = p.y,
                        nextX = i < cd.data.length - 1 ? cd.data[i + 1].x : nowX,
                        nextY = i < cd.data.length - 1 ? cd.data[i + 1].y : nowY,
                        cAx = last1X + (nowX - last2X) * scale,
                        cAy = last1Y + (nowY - last2Y) * scale,
                        cBx = nowX - (nextX - last1X) * scale,
                        cBy = nowY - (nextY - last1Y) * scale;
                    g.bezierCurveTo(cAx, cAy, cBx, cBy, nowX, nowY);
                });
                g.lineWidth = 3;
                g.strokeStyle = cd.color;
                g.stroke();
                g.restore();
            });

            // datas.forEach((cd) => {
            //     g.save();
            //     let fillStyle = g.createLinearGradient(0, cd.lastY, 0, height - bottom);
            //     fillStyle.addColorStop(0, cd.color);
            //     fillStyle.addColorStop(1, 'black');
            //     g.fillStyle = fillStyle;

            //     cd.data.forEach((p, i) => {
            //         if (i == 0) {
            //             g.beginPath();
            //             g.moveTo(p.x, p.y);
            //             return;
            //         }

            //         let cp: Point;
            //         if (i == 1) {
            //             cp = generateCtrlPoint(p, cd.data[0], cd.data[2]);
            //         } else {
            //             cp = generateCtrlPoint(cd.data[i - 1], p, cd.data[i - 2]);
            //         }

            //         console.log(cp, p);
            //         g.quadraticCurveTo(cp.x, cp.y, p.x, p.y);
            //     });

            //     g.lineWidth = 3;
            //     g.strokeStyle = cd.color;
            //     g.stroke();
            //     g.restore();
            // });
        }
    }

    protected get yAxisRenderer(): RendererFunction {
        let yAxis = this.yAxis;
        let fomartter = this.getAxisFomartter(yAxis);
        return (
            this.yAxis.renderer ||
            function (g: Graphics, rect: Rectangle, data: AxisData) {
                g.font = `${rect.height}px ${yAxis.label.family} blod`;
                g.textBaseline = 'middle';
                g.textAlign = 'right';
                g.fillStyle = typeof data == 'object' ? data.color : yAxis.label.color;
                g.fillText(fomartter(data), rect.x + rect.width - 4, rect.y + 2, rect.width);
            }
        );
    }

    protected get xAxisRenderer(): RendererFunction {
        let { numLines, xAxis } = this;
        let fomartter = this.getAxisFomartter(xAxis);
        return (
            this.xAxis.renderer ||
            function (g: Graphics, rect: Rectangle, data: AxisData) {
                let txt = fomartter(data);
                let y = rect.y + 4;
                let fontSize = (rect.height + 2) / numLines - 2;
                while (txt.length > 0) {
                    let l = txt.length;
                    while (g.measureText(txt.substr(0, l)).width > rect.width - 8) {
                        l--;
                    }
                    g.font = `${fontSize}px ${xAxis.label.family} blod`;
                    g.textBaseline = 'hanging';
                    g.textAlign = 'center';
                    g.fillStyle = typeof data == 'object' ? data.color : xAxis.label.color;
                    g.fillText(txt.substr(0, l), rect.x + rect.width * 0.5, y, rect.width);
                    txt = txt.substr(l);
                    y += fontSize + 2;
                }
            }
        );
    }
}
