import { Graphics } from '../../frameworks/components/Core';
import { BorderStyle } from '../../frameworks/types/BorderStyle';
import { FontStyle } from '../../frameworks/types/FontStyle';
import { AbstractChart, Serise, Axis, AxisData, RendererFunction } from './Chart';
import { Rectangle } from '../../frameworks/types/Rectangle';
import { ColorStyle } from '../../frameworks/types/ColorStyle';
import { Point } from '../../frameworks/types/Point';
import { max, min } from 'zrender/src/core/vector';
import Layer from 'zrender/src/canvas/Layer';

interface PieChartData {
    axis: AxisData;
    value: number;
    total: number;
}

export class PieChart extends AbstractChart {
    constructor() {
        super();

        this.setYAxis(
            new Axis({
                name: '单位：人次',
                label: new FontStyle({ color: 'white' }),
            })
        );
    }

    onComplete() {}

    paint(g: Graphics) {
        let serise = this.getSerise(),
            xAxis = this.getXAxis();
        if (!serise || serise.length <= 0) return;

        const { width, height } = this.innerBound;
        const font = this.getFont();
        const fontSize = height * 0.05;

        g.font = `${fontSize}px ${font.family} blod`;
        g.textBaseline = 'hanging';
        g.fillStyle = 'black';

        let top = fontSize * 3,
            left = top,
            right = top;

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
            let name = `${this.serise[0].name}`;
            let w = width - left - right;
            g.textBaseline = 'top';
            g.textAlign = 'center';
            g.fillStyle = 'white';
            g.font = `${fontSize}px ${font.family} blod`;
            g.fillText(name, left + w * 0.5, fontSize + 4, width - left - right);
        }

        let legendTotalWidth = width * 0.8;

        let lFontSize = fontSize * 0.6,
            lGap = lFontSize * 0.3,
            lWidth = lFontSize * 1.5;
        g.font = `${lFontSize}px ${this.xAxis.label.family} blod`;
        let numLines = this.generateLegendLines(g, lFontSize, lGap, lWidth, legendTotalWidth);
        let hGap = 4,
            bottom = (fontSize + hGap) * numLines - hGap;
        let xx = width * 0.1;
        let yy = height - bottom;
        let maxLabelWidth = 0;
        {
            // draw legend
            // calculate legend lines
            let sum = 0;
            this.serise[0].data.forEach((d) => {
                sum += d;
            });

            let xRenderer = function (g: Graphics, rect: Rectangle, data: AxisData, curVal: number, total: number) {
                let fontSize = rect.height,
                    lFontSize = fontSize * 0.6,
                    lGap = lFontSize * 0.3,
                    lWidth = lFontSize * 1.5;
                g.fillStyle = typeof data == 'object' ? data.color : this.xAxis.label.color;
                g.fillRect(rect.x, rect.y + (fontSize - lFontSize) * 0.5, lWidth, lFontSize);

                g.fillStyle = 'white';
                g.textBaseline = 'middle';
                g.textAlign = 'left';

                let label = String(typeof data == 'object' ? data.value : data);
                let per = String(total == 0 ? 0 : ((curVal * 100) / total).toFixed(2));
                while (true) {
                    let c = per.charAt(per.length - 1);
                    let i = per.indexOf('.');
                    if (c == '.' || (i >= 0 && c == '0')) {
                        per = per.substr(0, per.length - 1);
                        continue;
                    }
                    break;
                }

                let display = `${label}（${curVal}/${per}%）`;
                maxLabelWidth = left + g.measureText(display).width;

                g.fillText(`${label}`, rect.x + lGap + lWidth, rect.y + 2 + fontSize * 0.5);
            };

            xAxis.data.forEach((data, i) => {
                let ww = lGap + g.measureText(String(typeof data == 'object' ? data.value : data)).width + lWidth + lGap;
                let val = 0;
                if (this.serise && this.serise.length > 0 && i < this.serise[0].data.length) {
                    val = this.serise[0].data[i];
                }
                if (xx + ww > width * 0.9) {
                    xx = width * 0.1;
                    yy += fontSize + hGap;
                }

                // yy += fontSize * 1.2;
                xRenderer(g, new Rectangle({ x: xx, y: yy, width: ww, height: fontSize }), data, val, sum);
                xx += ww;
            });
        }

        {
            let sum = 0;
            this.serise[0].data.forEach((d) => {
                sum += d;
            });

            let renderData: Array<PieChartData> = [];
            for (let i = 0; i < this.xAxis.data.length; i++) {
                let axis = this.xAxis.data[i],
                    value = i < this.serise[0].data.length ? this.serise[0].data[i] : 0,
                    total = sum;
                renderData.push({ axis, value, total });
            }

            let aw = width - right,
                ah = height - top - bottom * 2;
            let ax = aw * 0.5,
                ay = top + ah * 0.5,
                r = Math.min(aw, ah) * 0.35;
            let fromAngle = -0.5 * Math.PI;

            if (sum < 0) {
                if (renderData.length > 0) {
                    let data = renderData[0];
                    let toAngle = fromAngle + 2 * Math.PI;
                    let color = typeof data.axis == 'object' ? data.axis.color : 'white';
                    g.fillStyle = color;
                    g.beginPath();
                    g.moveTo(ax, ay);
                    g.arc(ax, ay, r, fromAngle, toAngle);
                    g.fill();
                }
            } else {
                renderData.forEach((data) => {
                    let percent = data.value / data.total;
                    let toAngle = fromAngle + percent * 2 * Math.PI;
                    let color = typeof data.axis == 'object' ? data.axis.color : 'white';
                    g.fillStyle = color;
                    g.beginPath();
                    g.moveTo(ax, ay);
                    g.arc(ax, ay, r, fromAngle, toAngle);
                    g.fill();

                    fromAngle = toAngle;
                });

                fromAngle = -0.5 * Math.PI;

                let rightList: Array<LabelLayout> = [],
                    leftList: Array<LabelLayout> = [];

                let fs: number = fontSize * 0.8;

                let minY: number = ay - r * 1,
                    maxY: number = ay + r * 1.2 - fontSize;

                renderData.forEach((data) => {
                    if (data.value == 0) return;
                    let percent = data.value / data.total;
                    let toAngle = fromAngle + percent * 2 * Math.PI,
                        mid = (fromAngle + toAngle) / 2;

                    let xx = ax + r * Math.cos(mid),
                        yy = ay + r * Math.sin(mid);

                    let color = typeof data.axis == 'object' ? data.axis.color : 'white';

                    let isRight = xx > ax;
                    let RX = isRight ? ax - r : ax + r,
                        RY = ay,
                        R = r * 2.2;

                    let cp: Point = crossPoint(ax, ay, xx, yy, RX, RY, R, isRight);
                    if (cp.y < minY) {
                        cp.y = minY;
                        cp = crossPoint(cp.x, cp.y, cp.x + 10, cp.y, RX, RY, R, isRight);
                    } else if (cp.y > maxY) {
                        cp.y = maxY;
                        cp = crossPoint(cp.x, cp.y, cp.x + 10, cp.y, RX, RY, R, isRight);
                    }

                    let list: Array<LabelLayout> = cp.x < ax ? leftList : rightList;
                    let layout: LabelLayout = {
                        label: String(data.value),
                        percent: data.value / data.total,
                        position: cp.x < ax ? 'right' : 'left',
                        color: color,
                        rx: RX,
                        ry: RY,
                        radius: R,
                        ax: xx,
                        ay: yy,
                        bx: cp.x,
                        by: cp.y,
                        width: 0,
                        height: fs * 2.5,
                    };
                    list.push(layout);

                    fromAngle = toAngle;
                });

                for (let n = 0; n < 1; n++) {
                    [rightList, leftList].forEach((list, i) => {
                        adjustSingleSide(list, maxY - minY, i == 0, fontSize * 2.2);
                    });
    
                    [rightList, leftList].forEach((list) => {
                        list.forEach((layout) => {
                            let cp: Point = { x: layout.bx, y: layout.by };
                            let isRight = layout.position == 'right';
                            let RX = layout.rx,
                                RY = layout.ry,
                                R = layout.radius;
                            cp = crossPoint(cp.x, cp.y, cp.x + 10, cp.y, RX, RY, R, !isRight);
                            // if (!cp) return;
                            // if (cp.y < minY) {
                            //     cp.y = minY;
                            //     cp = crossPoint(cp.x, cp.y, cp.x + 10, cp.y, RX, RY, R, !isRight);
                            // } else if (cp.y > maxY) {
                            //     cp.y = maxY;
                            //     cp = crossPoint(cp.x, cp.y, cp.x + 10, cp.y, RX, RY, R, !isRight);
                            // }
                            layout.bx = cp.x;
                            layout.by = cp.y;
                        });
                    });
                }

                const offset = 15;

                [rightList, leftList].forEach((list) => {
                    list.forEach((layout) => {
                        g.strokeStyle = layout.color;
                        g.beginPath();
                        g.moveTo(layout.ax, layout.ay);
                        g.lineTo(layout.bx, layout.by);
                        g.lineTo(layout.bx + (layout.position == 'right' ? -offset : offset), layout.by);
                        g.stroke();
                        g.fillStyle = layout.color;

                        // let isRight = layout.position == 'right';
                        let isRight = layout.bx < ax;

                        g.textAlign = isRight ? 'right' : 'left';
                        g.fillText(layout.label, layout.bx + (isRight ? -offset * 1.5 : offset * 1.5), layout.by + 2);

                        let per = String((layout.percent * 100).toFixed(2));
                        while (true) {
                            let c = per.charAt(per.length - 1);
                            let i = per.indexOf('.');
                            if (c == '.' || (i >= 0 && c == '0')) {
                                per = per.substr(0, per.length - 1);
                                continue;
                            }
                            break;
                        }
                        g.fillText(`(${per}%)`, layout.bx + (isRight ? -offset * 1.5 : offset * 1.5), layout.by + fs);
                    });
                });
            }
        }
    }

    protected get xAxisRenderer(): RendererFunction {
        let { xAxis } = this;
        let fomartter = this.getAxisFomartter(xAxis);
        return (
            xAxis.renderer ||
            function (g: Graphics, rect: Rectangle, data: AxisData) {
                let fontSize = rect.height,
                    lFontSize = fontSize * 0.6,
                    lGap = lFontSize * 0.3,
                    lWidth = lFontSize * 1.5;
                g.fillStyle = typeof data == 'object' ? data.color : this.xAxis.label.color;
                g.fillRect(rect.x, rect.y + (fontSize - lFontSize) * 0.5, lWidth, lFontSize);

                g.fillStyle = 'white';
                g.textBaseline = 'middle';
                g.textAlign = 'left';
                g.fillText(String(typeof data == 'object' ? data.value : data), rect.x + lGap + lWidth, rect.y + 2 + fontSize * 0.5);
            }
        );
    }

    private generateLegendLines(g: Graphics, fontSize: number, lGap: number, lWidth: number, totalWidth: number): number {
        let numLines = 1;
        let { xAxis } = this;

        let fomartter =
            xAxis.fomartter ||
            function (data: AxisData) {
                return String(typeof data == 'object' ? data.value : data);
            };

        let w = -lGap;
        xAxis.data.forEach((data) => {
            let lw = lGap + g.measureText(fomartter(data)).width + lWidth + lWidth;
            if (w + lw > totalWidth) {
                w = lw;
                numLines++;
            } else {
                w += lw;
            }
        });

        return numLines;
    }
}

type Dir = -1 | 1;

interface LabelLayout {
    label: string;
    percent: number;
    position: 'left' | 'right';
    color: ColorStyle;
    ax: number;
    ay: number;
    bx: number;
    by: number;
    width: number;
    height: number;

    rx: number;
    ry: number;
    radius: number;
}

function adjustSingleSide(list: Array<LabelLayout>, height: number, isRight, fs) {
    if (!isRight) list.reverse();

    function shiftDown(start, end, delta) {
        for (let j = start; j < end; j++) {
            list[j].by += delta;
            if (j > start && j + 1 < end && list[j + 1].by > list[j].by + list[j].height) {
                // shiftUp(j, delta / 2);
                return;
            }
        }
        // shiftUp(end - 1, delta / 2);
    }

    function shiftUp(end, delta) {
        for (let j = end; j >= 0; j--) {
            list[j].by -= delta;
            if (j > 0 && list[j].by > list[j - 1].by + list[j - 1].height) {
                break;
            }
        }
    }

    let lastY = Number.NEGATIVE_INFINITY;
    let delta;
    let len = list.length;
    list.forEach((d, i) => {
        delta = d.by - lastY;
        if (delta < 0) {
            shiftDown(i, len, -delta);
        }

        lastY = d.by + d.height;
    });

    if (height / 2 - lastY < 0) {
        shiftUp(len - 1, fs);
    }
}

const crossPoint = function (x1, y1, x2, y2, m, n, r, isRight): Point {
    // if(x1 == x2) x2 = x2 + 1;
    let kbArr = binaryEquationGetKB(x1, y1, x2, y2);
    let k = kbArr[0],
        b = kbArr[1];

    let aX = 1 + k * k;
    let bX = 2 * k * (b - n) - 2 * m;
    let cX = m * m + (b - n) * (b - n) - r * r;
    let insertPoints = [];

    let xArr = quadEquationGetX(aX, bX, cX);

    xArr.forEach((x) => {
        let y = k * x + b;
        insertPoints.push({ x: x, y: y });
    });

    return insertPoints.length > 0 ? insertPoints[isRight ? 0 : insertPoints.length > 1 ? 1 : 0] : { x: x1, y: y1 };
};

function quadEquationGetX(a, b, c) {
    let xArr = [];
    let result = Math.pow(b, 2) - 4 * a * c;
    if (result > 0) {
        xArr.push((-b + Math.sqrt(result)) / (2 * a));
        xArr.push((-b - Math.sqrt(result)) / (2 * a));
    } else if (result == 0) {
        xArr.push(-b / (2 * a));
    }
    return xArr;
}

function binaryEquationGetKB(x1, y1, x2, y2) {
    let k = (y1 - y2) / (x1 - x2);
    let b = (x1 * y2 - x2 * y1) / (x1 - x2);
    return [k, b];
}
