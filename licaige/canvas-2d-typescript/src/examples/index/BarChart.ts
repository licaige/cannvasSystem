import { AbstractChart, RendererFunction, AxisData } from './Chart';
import { PropertyChangedEvent } from '../../frameworks/events/PropertyChangedEvent';
import { Serise } from './Chart';
import { TimerEvent } from '../../frameworks/events/TimerEvent';
import { Graphics } from '../../frameworks/components/Core';
import { Rectangle } from '../../frameworks/types/Rectangle';

export class BarChart extends AbstractChart {
    constructor() {
        super();
    }

    onPropertyChanged(e: PropertyChangedEvent) {
        if (e.propertyKey == 'serise') {
            this.generateMaxValue();

            let time = 1000,
                cnt = 15; // 1s
            let oldValue: Array<Serise> = e.oldValue as Array<Serise>;
            let newValue: Array<Serise> = e.newValue as Array<Serise>;
            this.timer.stop();
            if (newValue && newValue.length > 0) {
                let gaps: Array<number> = [],
                    newValues: Array<number> = [];
                if (!oldValue) {
                    oldValue = new Array();
                }
                if (oldValue.length < 1) {
                    oldValue.push(new Serise({ name: '', data: [] }));
                }
                for (let i = 0; i < newValue[0].data.length; i++) {
                    if (oldValue[0].data.length <= i) oldValue[0].data.push(0);
                    let start = oldValue[0].data[i],
                        end = newValue[0].data[i];
                    gaps.push(Math.ceil((end - start) / cnt));
                    newValues.push(end);
                    this.serise[0].data[i] = start;
                }
                this.timer.on(TimerEvent.NAME, (event) => {
                    let e = event as TimerEvent;
                    for (let i = 0; i < this.serise[0].data.length; i++) {
                        this.serise[0].data[i] = e.repeat == 0 ? newValues[i] : this.serise[0].data[i] + gaps[i];
                    }
                    this.render();
                });
                this.timer.start({ delay: Math.ceil(time / cnt), repeat: cnt });
            } else {
                super.onPropertyChanged(e);
            }
        } else {
            super.onPropertyChanged(e);
        }
    }

    private numLines: number = 1;
    paint(g: Graphics) {
        let serise = this.getSerise(),
            xAxis = this.getXAxis();
        // if (!serise || serise.length <= 0) return;
        let s: Serise = !serise || serise.length <= 0 ? undefined : serise[0];

        const { width, height } = this.innerBound;
        const font = this.getFont();
        const fontSize = height * 0.05,
            top = (fontSize + 8) * 3 - 4,
            axisWidth: number = 1;

        let maxValue = this.maxValue;

        g.font = `${fontSize}px ${font.family} blod`;
        g.textBaseline = 'hanging';
        g.fillStyle = 'black';
        let metrix = g.measureText(String(maxValue));
        let left: number = Math.ceil(metrix.width) * 2,
            right = left;

        let columnWidth: number = (width - (left + 4) - (right + 4) + axisWidth) / xAxis.data.length - axisWidth;

        let numLines: number = 1;
        xAxis.data.forEach((l) => {
            let mw = Math.ceil(g.measureText(String(l)).width);
            while (mw > columnWidth * numLines) {
                numLines++;
            }
        });
        this.numLines = numLines;
        let bottom = (fontSize + 8) * numLines - 4;

        {
            // draw legend
            let w = width - left - right;
            let titleFontSize = fontSize * 1.2;
            let name = `${this.title}`;
            g.font = `${titleFontSize}px ${font.family} blod`;

            let titleWidth = g.measureText(name).width;
            let ww = titleWidth + titleFontSize * 2.5;
            let lw = left + w * 0.5 - ww * 0.5;
            let tw = lw + ww - titleWidth * 0.5;

            let lh = fontSize;

            g.fillStyle = font.color;
            g.fillRect(lw, titleFontSize - lh * 0.5 - 2, titleFontSize * 1.5, lh);

            g.textBaseline = 'middle';
            g.textAlign = 'center';
            g.fillStyle = 'white';
            g.fillText(name, tw, titleFontSize + 2, w);
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
            // draw x axis and column
            let x = left + 4,
                cGap = columnWidth * 0.25,
                axisHeight = (fontSize + 2) * numLines - 2;

            let xRenderer = this.xAxisRenderer;
            xAxis.data.forEach((name, index) => {
                let curValue = !s  ? 0 : index < s.data.length ? s.data[index] : 0;
                let hh = (curValue / maxValue) * (height - bottom - top);
                let ww = columnWidth - cGap * 2;
                let yy = height - bottom - hh;
                g.beginPath();
                g.fillStyle = font.color;
                g.rect(x + cGap, height - bottom, ww, -hh);
                g.fill();

                let fs = fontSize * 0.8;
                g.font = `${fs}px ${font.family} blod`;
                g.textBaseline = 'hanging';
                g.textAlign = 'center';
                g.fillStyle = font.color;
                g.fillText(String(curValue), x + cGap + ww / 2, yy - fs - 1, ww);

                xRenderer(g, new Rectangle({ x, y: height - bottom, width: columnWidth, height: axisHeight }), name);
                x += columnWidth + axisWidth;
            });
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
