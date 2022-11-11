import { Graphics, rgb } from '../../frameworks/components/Core';
import { InvalidateProperties } from '../../frameworks/components/DisplayObject';
import { PriorityQueue } from '../../frameworks/core/PriorityQueue';
import { PropertyChangedEvent } from '../../frameworks/events/PropertyChangedEvent';
import { TimerEvent } from '../../frameworks/events/TimerEvent';
import { BorderStyle } from '../../frameworks/types/BorderStyle';
import { ColorStyle } from '../../frameworks/types/ColorStyle';
import { FontStyle } from '../../frameworks/types/FontStyle';
import { Rectangle } from '../../frameworks/types/Rectangle';
import { AbstractChart, Axis, FomartterFunction, Serise, AxisData, Category, RendererFunction as RendererFunction } from './Chart';

interface ChartData {
    name: AxisData;
    value: number;
    index?: number;
}

interface TopChartData {
    from: ChartData;
    to: ChartData;
}

interface ChangeData {
    datas: Array<TopChartData>;
    repeat?: number;
    total: number;
}

export class TopChart extends AbstractChart {
    private count: number;
    private renderData: ChangeData;
    private lineValue: number;

    constructor() {
        super();
        this.count = 10;
        this.lineValue = 30000;
    }

    onComplete(): void {
        super.onComplete();
        this.setYAxis(
            new Axis({ name: '单位：人次', label: new FontStyle({ color: rgb(255,255,158) }), border: new BorderStyle({ color: 'white', size: 1 }) })
        );
    }

    private generateTopChartData(serise: Array<Serise>): Map<AxisData, ChartData> {
        let map: Map<AxisData, ChartData> = new Map();
        if (!serise || serise.length == 0 || serise[0].data.length == 0) return map;
        let pq: PriorityQueue<ChartData> = new PriorityQueue((a, b) => a.value - b.value);
        let xAxis = this.xAxis;
        for (let i = 0; i < xAxis.data.length; i++) {
            let data: ChartData = { name: String(xAxis.data[i]), value: serise[0].data[i] };
            pq.push(data);
        }

        let i = 0;
        while (!pq.isEmpty() && i < this.count) {
            let chartData = pq.pop();
            chartData.index = i++;
            map.set(chartData.name, chartData);
        }

        return map;
    }

    onPropertyChanged(e: PropertyChangedEvent) {
        if (e.propertyKey == 'serise') {
            this.generateMaxValue();

            let time = 1000,
                cnt = 15; // 1s
            let oldValue: Array<Serise> = e.oldValue as Array<Serise>;
            let newValue: Array<Serise> = e.newValue as Array<Serise>;
            let xAxis = this.xAxis;

            this.timer.stop();
            if (xAxis && xAxis.data.length > 0 && newValue && newValue.length > 0) {
                this.renderData = { datas: [], total: cnt };
                let oldValueMap = this.generateTopChartData(oldValue);
                let newValueMap = this.generateTopChartData(newValue);
                newValueMap.forEach((to) => {
                    let from = oldValueMap.get(to.name);
                    this.renderData.datas.push({ from, to });
                    oldValueMap.delete(to.name);
                });

                oldValueMap.forEach((from) => {
                    let to = undefined;
                    this.renderData.datas.push({ from, to });
                });

                this.timer.on(TimerEvent.NAME, (event) => {
                    let e = event as TimerEvent;
                    this.renderData.repeat = e.repeat;
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

    paint(g: Graphics) {
        let serise = this.getSerise(),
            xAxis = this.getXAxis();
        if (!serise || serise.length <= 0 || !this.renderData || !this.renderData.datas) return;

        const { width, height } = this.innerBound;
        const font = this.getFont();
        const fontSize = height * 0.05,
            axisFontSize = fontSize * 0.8,
            axisWidth: number = 1;
        // let s: Serise = serise && serise.length > 0 ? serise[0] : undefined;

        this.generateMaxValue();
        let maxValue = this.maxValue;

        g.font = `${fontSize}px ${font.family} blod`;
        g.textBaseline = 'hanging';
        g.fillStyle = 'black';

        let maxNameWidth: number = 1;
        xAxis.data.forEach((name) => (maxNameWidth = Math.max(maxNameWidth, g.measureText(String(name)).width)));
        g.font = `${axisFontSize}px ${font.family} blod`;
        let maxValueWidth = g.measureText(String(maxValue)).width;

        let top = fontSize * 3,
            bottom = maxValueWidth,
            left = maxNameWidth + 8,
            right = 20;

        {
            let name = `${this.yAxis.name}`;
            let fs = fontSize * 0.8;

            g.textBaseline = 'top';
            g.textAlign = 'left';
            g.fillStyle = 'white';
            g.font = `${fs}px ${font.family} blod`;
            g.fillText(name, 4, 4);
        }

        {
            // draw title
            let name = `${this.serise[0].name}TOP${this.count}`;
            let w = width - left - right;
            g.textBaseline = 'top';
            g.textAlign = 'center';
            g.fillStyle = 'white';
            g.font = `${fontSize}px ${font.family} blod`;
            g.fillText(name, left + w * 0.5, fontSize + 4, width - left - right);
        }

        {
            // draw axis line
            let xx = Math.ceil(left);
            let yy = Math.ceil(height - bottom);

            g.save();
            g.translate(0.5, 0.5);

            g.beginPath();
            g.lineWidth = this.xAxis.border.size;
            g.strokeStyle = this.xAxis.border.color;
            g.moveTo(xx, top);
            g.lineTo(xx, yy);
            g.stroke();

            g.lineWidth = this.yAxis.border.size;
            g.strokeStyle = this.yAxis.border.color;
            g.moveTo(xx, yy);
            g.lineTo(width - right, yy);
            g.stroke();

            g.restore();
        }

        {
            // draw yAxis
            let num: number = 0,
                zeroX = 0,
                gap = maxValue / 5,
                gapWidth = (width - left - right) / 5;

            let yRenderer = this.yAxisRenderer;
            while (num <= maxValue) {
                yRenderer(g, new Rectangle({ x: left + zeroX, y: height - bottom, width: width + gapWidth, height: fontSize }), num);
                num += gap;
                zeroX += gapWidth;
            }
        }

        {
            const { count } = this;
            let columnHeight: number = (height - top - bottom + axisWidth) / count - axisWidth;
            let zeroX = Math.ceil(left) + axisWidth,
                zeroY = top,
                gap = columnHeight / 8;

            g.save();
            g.beginPath();
            g.rect(0, top, width, height - top - bottom);
            g.clip();

            let repeat = this.renderData.repeat;
            let total = this.renderData.total;
            let xRenderer = this.xAxisRenderer;

            this.renderData.datas.forEach((data) => {
                let { from, to } = data;
                let { name: fromName, index: fromIndex = count, value: fromValue = 0 } = from || {};
                let { name: toName, index: toIndex = count, value: toValue = 0 } = to || {};

                let name = fromName || toName;
                let renderValue = Math.ceil(toValue - (toValue - fromValue) * (repeat / total));
                zeroY = top + (columnHeight + axisWidth) * (toIndex - (toIndex - fromIndex) * (repeat / total));

                let w = ((width - left - right) * renderValue) / maxValue,
                    h = columnHeight - gap * 2,
                    tf = h * 0.6;

                g.fillStyle = rgb(53, 214, 252);
                g.beginPath();
                g.rect(zeroX, zeroY + gap, w, h);
                g.fill();

                g.font = `${tf}px ${font.family} blod`;
                g.fillStyle = 'white';
                g.textBaseline = 'middle';
                g.textAlign = 'center';
                g.fillText(String(renderValue), left + w / 2, zeroY + columnHeight * 0.5, w);

                // draw x axis
                xRenderer(g, new Rectangle({ x: 0, y: zeroY, width: left - 4, height: columnHeight }), name);
            });
            g.restore();
        }
    }

    getCount(): number {
        return this.count;
    }
    @InvalidateProperties
    setCount(count: number): void {
        this.count = count;
    }

    protected get yAxisRenderer(): RendererFunction {
        let { yAxis } = this;
        let fomartter = this.getAxisFomartter(yAxis);
        return (
            this.yAxis.renderer ||
            function (g: Graphics, rect: Rectangle, data: AxisData) {
                let size = rect.height * 0.8;
                g.save();
                g.translate(rect.x, rect.y);
                g.textBaseline = 'hanging';
                g.textAlign = 'right';
                g.fillStyle = typeof data == 'object' ? data.color : yAxis.label.color;
                g.font = `${size}px ${yAxis.label.family} blod`;
                g.rotate((-30 * Math.PI) / 180);
                g.fillText(fomartter(data), 0, 0);
                g.restore();
            }
        );
    }

    protected get xAxisRenderer(): RendererFunction {
        let { xAxis } = this;
        let fomartter = this.getAxisFomartter(this.xAxis);
        return (
            this.xAxis.renderer ||
            function (g: Graphics, rect: Rectangle, data: AxisData) {
                let size = rect.height * 0.5;
                g.save();
                g.font = `${size}px ${xAxis.label.family} blod`;
                g.fillStyle = 'black';
                g.textBaseline = 'middle';
                g.textAlign = 'right';
                g.fillStyle = typeof data == 'object' ? data.color : xAxis.label.color;
                g.fillText(fomartter(data), rect.x + rect.width, rect.y + 2 + rect.height * 0.5);
                g.restore();
            }
        );
    }
}
