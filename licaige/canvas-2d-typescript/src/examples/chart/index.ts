import { Application } from '../../frameworks/components/Application';
import { Register } from '../../frameworks/controls/Register';
import { MouseRegister } from '../../frameworks/controls/MouseRegister';
import { PieChart } from './PieChart';
import { BackgroundStyle } from '../../frameworks/types/BackgroundStyle';
import { FontStyle } from '../../frameworks/types/FontStyle';
import { BorderStyle } from '../../frameworks/types/BorderStyle';
import { Axis, Serise } from '../index/Chart';
import { ColorStyle } from '../../frameworks/types/ColorStyle';
import { rgb } from '../../frameworks/components/Core';

// const HEX_STR = "0123456789ABCDEF"
// const hex = (i) => {
//     let h = HEX_STR.charAt(i / 16), l = HEX_STR.charAt(i % 16);
//     return `${h}${l}`;
// }
// const rgb = (r, g, b)=>{
//     let hR = hex(r), hG = hex(g), hB = hex(b);
//     return `#${hR}${hG}${hB}`;
// }

const colors: Array<ColorStyle> = [
    rgb(233,221,182),
    rgb(251,236,222),
    rgb(242,202,201),
    rgb(208,222,170),
    rgb(200,173,196),
    rgb(147,181,207),
    rgb(196,203,207),
    rgb(198,230,232),
    rgb(131,203,172),
    rgb(198,223,200),
    rgb(237,195,174),
    '#00F5FF',
    '#8B008B',
    '#90EE90',
    '#FFA500',
    '#000B8B',
    '#FF1493',
    '#32CD32',
    '#551A8B',
    '#FF00FF',
    '#FF0000',
    '#8B0000',
];

const values: Array<number> = [163, 0, 0, 0, 7, 4, 1, 0, 2, 2, 0];

class CusApp extends Application {
    onComplete(): void {
        this.setBackground(new BackgroundStyle({ enable: true, color: '#000000' }));

        let pie: PieChart = new PieChart();
        pie.setX(1 / 3);
        pie.setY(0.6);
        pie.setWidth(1 / 3);
        pie.setHeight(0.38);
        pie.setBackground(new BackgroundStyle({ enable: false }));

        let xAxisData = [],
            seriseData = [];

        for (let i = 0; i < 11; i++) {
            xAxisData.push({ value: 'asdsads', color: colors[i] });
            seriseData.push(parseInt(String(Math.random() * 10000)));
            // seriseData.push(values[i % values.length]);
        }
        pie.setXAxis(
            new Axis({
                name: '票种',
                label: new FontStyle({ color: 'white' }),
                border: new BorderStyle({ color: 'white', size: 1 }),
                data: xAxisData,
            })
        );
        pie.setSerise([
            new Serise({
                name: '全线网票卡使用情况',
                data: seriseData,
            }),
        ]);
        this.addChild(pie);
    }
}
const app = new CusApp();

Register.register(MouseRegister);
