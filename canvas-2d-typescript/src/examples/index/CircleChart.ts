import { Component } from '../../frameworks/components/Component';
import { InvalidateProperties } from '../../frameworks/components/DisplayObject';
import { Graphics, rgb } from '../../frameworks/components/Core';
import { Timer } from '../../frameworks/components/Timer';
import { TimerEvent } from '../../frameworks/events/TimerEvent';

const PI = Math.PI;

const BLUE = rgb(25, 57, 238);

export class CircleChart extends Component {
    private title: string;
    private unit: string;
    private value: number;
    private startAngle: number;

    constructor() {
        super();
        this.startAngle = -0.5 * PI;
    }

    onComplete(): void {
        let timer = new Timer();
        timer.on(TimerEvent.NAME, () => {
            let a = this.getStartAngle();
            a += 0.1;
            if (a > PI) {
                a = a - 2 * PI;
            }
            this.setStartAngle(a);
        });
        timer.start({ delay: 100 });
    }

    paint(g: Graphics) {
        const { width, height } = this.innerBound;
        const { font, startAngle } = this;
        let titleFontSize: number = width * 0.095;
        let w = width,
            h = height - titleFontSize * 1.2;
        g.save();
        g.textBaseline = 'middle';
        g.textAlign = 'center';
        g.fillStyle = 'white';
        g.shadowColor = BLUE;
        g.shadowOffsetX = 2;
        g.shadowOffsetY = 2;
        g.shadowBlur = 2;
        g.font = `${titleFontSize}px ${font.family} blod`;
        g.fillText(this.title, width / 2, h);
        g.restore();

        let R: number = Math.min(w, h) * 0.3;
        {
            let grd = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, R);
            grd.addColorStop(0, 'black');
            grd.addColorStop(1, BLUE);

            g.save();
            g.beginPath();
            g.strokeStyle = 'gray';
            g.fillStyle = BLUE;
            g.arc(w / 2, h / 2, R, 0, PI * 2);
            g.fill();
            g.stroke();
            g.restore();
        }

        let R2 = R * 0.9;
        {
            g.save();
            g.lineWidth = R * 0.06;
            g.strokeStyle = 'gray';
            let angle: number = 0;
            let offset: number = 0.05;
            while (angle <= PI * 2) {
                g.beginPath();
                g.arc(w / 2, h / 2, R2, angle, angle + offset);
                angle += offset * 2;
                g.stroke();
            }
            g.restore();
        }

        let R3 = R2 * 0.8;
        {
            g.save();
            g.lineWidth = R * 0.06;
            g.strokeStyle = 'gray';
            let A = (PI * 2) / 3;
            let angles: Array<number> = [0, A, A * 2];
            angles.forEach((a) => {
                g.beginPath();
                g.arc(w / 2, h / 2, R3, a + startAngle, a + startAngle + A * 0.8);
                g.stroke();
            });
            g.restore();
        }

        let R4 = R3 * 0.8;
        {
            let grd = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, R4);
            grd.addColorStop(0, 'black');
            grd.addColorStop(0.8, '#0d47a1');
            grd.addColorStop(1, '#1e88e5');

            g.save();
            g.beginPath();
            g.fillStyle = grd;
            g.arc(w / 2, h / 2, R4, 0, PI * 2);
            g.fill();
            g.restore();
        }

        {
            let { value, unit } = this;
            let valueDisplay = String(value);
            let unitDisplay = unit;
            let valueFontSize: number = width * 0.135;
            let unitFontSize: number = valueFontSize * 0.5;

            if (value >= 10000 * 10000) {
                valueDisplay = String(value / (10000 * 10000));
                unitDisplay = '亿' + unit;
            } else if (value >= 10000) {
                valueDisplay = String(value / 10000);
                unitDisplay = '万' + unit;
            }

            let dotIdx = valueDisplay.indexOf('.');
            if (dotIdx >= 0) {
                valueDisplay = parseFloat(valueDisplay).toFixed(4 - dotIdx);
            }

            g.save();
            g.textBaseline = 'middle';
            g.textAlign = 'center';
            g.fillStyle = 'white';
            g.shadowColor = BLUE;
            g.shadowOffsetX = 2;
            g.shadowOffsetY = 2;
            g.shadowBlur = 2;
            g.font = `${valueFontSize}px ${font.family} blod`;
            g.fillText(valueDisplay, w / 2, h / 2);

            g.font = `${unitFontSize}px ${font.family} blod`;
            g.fillText(unitDisplay, w / 2, h / 2 + valueFontSize);
            g.restore();
        }
    }

    public getTitle(): string {
        return this.title;
    }
    @InvalidateProperties
    public setTitle(title: string) {
        this.title = title;
    }

    public getValue(): number {
        return this.value;
    }
    @InvalidateProperties
    public setValue(value: number) {
        this.value = value;
    }

    public getUnit(): string {
        return this.unit;
    }
    @InvalidateProperties
    public setUnit(unit: string) {
        this.unit = unit;
    }

    public getStartAngle(): number {
        return this.startAngle;
    }
    @InvalidateProperties
    public setStartAngle(startAngle: number) {
        this.startAngle = startAngle;
    }
}
