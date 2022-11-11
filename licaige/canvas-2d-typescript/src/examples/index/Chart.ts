import { Container } from '../../frameworks/components/Container';
import { Timer } from '../../frameworks/components/Timer';
import { TimerEvent } from '../../frameworks/events/TimerEvent';
import { Graphics, rgb } from '../../frameworks/components/Core';
import { InvalidateProperties } from '../../frameworks/components/DisplayObject';
import { FontStyle } from '../../frameworks/types/FontStyle';
import { BorderStyle } from '../../frameworks/types/BorderStyle';
import { CloneableDescriptor } from '../../frameworks/core/Cloneable';
import { Cloneable } from '../../../lib/frameworks/core/Cloneable';
import { ColorStyle } from '../../frameworks/types/ColorStyle';
import { Rectangle } from '../../frameworks/types/Rectangle';

export type FomartterFunction = (data: AxisData) => string;
export type RendererFunction = (g: Graphics, rect: Rectangle, data: AxisData) => void;

interface ISerise {
    name?: string;
    data?: Array<number>;
}

@CloneableDescriptor
export class Serise implements Cloneable<Serise> {
    readonly name: string;
    readonly data: Array<number>;
    constructor(param: ISerise) {
        let { name, data = [] } = param || {};
        this.name = name;
        this.data = data;
    }

    clone(): Serise {
        let name = this.name,
            data = [];
        this.data.forEach((d) => data.push(d));

        return new Serise({ name, data });
    }
}

export interface Category {
    value?: string;
    color?: ColorStyle;
}

export type AxisData = number | string | Category;

type IAxis = {
    name?: string;
    label?: FontStyle;
    border?: BorderStyle;
    data?: Array<AxisData>;
    fomartter?: FomartterFunction;
    renderer?: RendererFunction;
};

@CloneableDescriptor
export class Axis implements Cloneable<Axis> {
    readonly name: string;
    readonly label: FontStyle;
    readonly border: BorderStyle;
    readonly data: Array<AxisData>;
    readonly fomartter: FomartterFunction;
    readonly renderer: RendererFunction;

    constructor(param?: IAxis) {
        let { name, label = new FontStyle(), border = new BorderStyle(), data = [], fomartter, renderer } = param || {};
        this.name = name;
        this.label = label;
        this.border = border;
        this.data = data;
        this.fomartter = fomartter;
        this.renderer = renderer;
    }

    clone(): Axis {
        let name = this.name,
            label = new FontStyle(this.label),
            border = new BorderStyle(this.border),
            data = [];

        this.data.forEach((d) => data.push(d));
        return new Axis({ name, label, border, data });
    }
}

export interface IChart {
    getTitle(): string;
    getSerise(): Array<Serise>;
    getXAxis(): Axis;
    getYAxis(): Axis;

    setTitle(title: string): void;
    setSerise(serise: Array<Serise>): void;
    setXAxis(axis: Axis): void;
    setYAxis(axis: Axis): void;
}

export abstract class AbstractChart extends Container implements IChart {
    protected title: string;
    protected serise: Array<Serise>;
    protected xAxis: Axis;
    protected yAxis: Axis;
    protected timer: Timer;
    protected maxValue: number = 100;

    constructor() {
        super();
        this.serise = [];
        this.xAxis = new Axis();
        this.yAxis = new Axis();
        this.timer = new Timer();
    }

    onComplete(): void {
        let yAxis = new Axis({
            name: '客流(人次)',
            border: new BorderStyle({ color: 'white', size: 1 }),
            label: new FontStyle({ color: rgb(255,255,158) }),
        });
        this.setYAxis(yAxis);
    }

    getTitle(): string {
        return this.title;
    }
    @InvalidateProperties
    setTitle(title: string): void {
        this.title = title;
    }

    getSerise(): Array<Serise> {
        return this.serise;
    }
    @InvalidateProperties
    setSerise(serise: Array<Serise>): void {
        this.serise = serise;
    }

    getXAxis(): Axis {
        return this.xAxis;
    }
    @InvalidateProperties
    setXAxis(axis: Axis): void {
        this.xAxis = axis;
    }

    getYAxis(): Axis {
        return this.yAxis;
    }
    @InvalidateProperties
    setYAxis(axis: Axis) {
        this.yAxis = axis;
    }

    protected generateMaxValue(): void {
        let max: number = 0;
        this.serise.forEach((s) => s.data.forEach((d) => (max = Math.max(max, d))));

        max = Math.max(100, max);

        let strGap = String(parseInt(String(Math.max(100, max) / 5)));
        let i = parseInt(strGap.substr(0, 2));
        if (i > 50) {
            i = 100;
        } else if (i > 20) {
            i = 50;
        } else if (i > 10) {
            i = 20;
        } else {
            i = 10;
        }
        let maxValue = Math.ceil(i * Math.pow(10, strGap.length - 2) * 5);
        this.maxValue = maxValue;
    }

    protected getAxisFomartter(axis: Axis): FomartterFunction {
        return (
            axis.fomartter ||
            function (data: AxisData) {
                if (typeof data == 'object') {
                    return data.value;
                }
                return String(data);
            }
        );
    }
}
