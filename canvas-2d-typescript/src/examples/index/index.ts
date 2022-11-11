import { Application } from '../../frameworks/components/Application';
import { FontStyle } from '../../frameworks/types/FontStyle';
import { Register } from '../../frameworks/controls/Register';
import { MouseRegister } from '../../frameworks/controls/MouseRegister';
import { BackgroundStyle } from '../../frameworks/types/BackgroundStyle';
import { BarChart } from './BarChart';
import { TopChart } from './TopChart';
import { PieChart } from './PieChart';
import { CircleChart } from './CircleChart';
import { AreaChart } from './AreaChart';
import { Padding } from '../../frameworks/types/Padding';
import { SVGView } from './SVGView';
import { HttpRequest } from '../../frameworks/core/HttpRequest';
import { Timer } from '../../frameworks/components/Timer';
import { TimerEvent } from '../../frameworks/events/TimerEvent';
import { Serise, Axis } from './Chart';
import { BorderStyle } from '../../frameworks/types/BorderStyle';
import { ColorStyle } from '../../frameworks/types/ColorStyle';
import { rgb } from '../../frameworks/components/Core';

class CustomApplication extends Application {
    public c1: CircleChart;
    public c2: CircleChart;
    public c3: CircleChart;
    public areaChart: AreaChart;
    public svg: SVGView;
    public barChartMap: Map<string, BarChart>;
    public pieChart: PieChart;
    public topChart: TopChart;

    constructor() {
        super();
        this.setBackground(new BackgroundStyle({ enable: true, color: 'black' }));

        let c1: CircleChart = new CircleChart();
        c1.setX(6 / 9);
        c1.setY(0);
        c1.setWidth(1 / 9);
        c1.setHeight(0.25);
        c1.setBackground(new BackgroundStyle({ enable: false }));
        c1.setTitle('累计客运总量');
        c1.setUnit('乘次');
        c1.setValue(0);
        this.c1 = c1;

        let c2: CircleChart = new CircleChart();
        c2.setX(7 / 9);
        c2.setY(0);
        c2.setWidth(1 / 9);
        c2.setHeight(0.25);
        c2.setBackground(new BackgroundStyle({ enable: false }));
        c2.setTitle('日运总量');
        c2.setUnit('乘次');
        c2.setValue(0);
        this.c2 = c2;

        let c3: CircleChart = new CircleChart();
        c3.setX(8 / 9);
        c3.setY(0);
        c3.setWidth(1 / 9);
        c3.setHeight(0.25);
        c3.setBackground(new BackgroundStyle({ enable: false }));
        c3.setTitle('运行天数');
        c3.setUnit('天');
        c3.setValue(0);
        this.c3 = c3;

        let areaChart: AreaChart = new AreaChart();
        areaChart.setX(0);
        areaChart.setY(0);
        areaChart.setWidth(2 / 3);
        areaChart.setHeight(0.25);
        areaChart.setFont(new FontStyle({ color: 'blue' }));
        areaChart.setBackground(new BackgroundStyle({ enable: false }));
        this.areaChart = areaChart;

        this.barChartMap = new Map();

        let topChart: TopChart = new TopChart();
        topChart.setX(2 / 3);
        topChart.setY(0.6);
        topChart.setWidth(1 / 3);
        topChart.setHeight(0.38);
        topChart.setBackground(new BackgroundStyle({ enable: false }));
        this.topChart = topChart;

        let pieChart: PieChart = new PieChart();
        pieChart.setX(1 / 3);
        pieChart.setY(0.6);
        pieChart.setWidth(1 / 3);
        pieChart.setHeight(0.38);
        pieChart.setBackground(new BackgroundStyle({ enable: false }));
        this.pieChart = pieChart;

        let svg: SVGView = new SVGView();
        svg.setX(0);
        svg.setY(0.6);
        svg.setWidth(1 / 3);
        svg.setHeight(0.38);
        svg.setBackground(new BackgroundStyle({ enable: false }));

        // svg.setX(0);
        // svg.setY(0);
        // svg.setWidth(1);
        // svg.setHeight(1);
        // svg.setBackground(new BackgroundStyle({ enable: false }));
        this.svg = svg;
    }

    onComplete(): void {
        this.addChild(this.areaChart);
        this.addChild(this.topChart);
        this.addChild(this.c1);
        this.addChild(this.c2);
        this.addChild(this.c3);
        this.addChild(this.svg);
        this.addChild(this.pieChart);
    }
}

Register.register(MouseRegister);
const app = new CustomApplication();
const req = new HttpRequest();
const host = '';
// const host = 'http://172.19.88.169:8080/console/passenger-flow/'

const getData = () => {
    let rand = Math.random()
    req.url(`${host}getPassengerFlow.action?_t=${rand}`).get((res) => {
        app.c1.setValue(res.totalPassengerCount);
        app.c2.setValue(res.todayPassengerCount);
        app.c3.setValue(res.normalDays);

        // AreaChart
        let s1: Serise = new Serise({
            name: '乘车客流',
            data: [],
        });
        let s2: Serise = new Serise({
            name: '售票客流',
            data: [],
        });

        let { rideFlow, saleFlow } = res;
        for (let i = 0; i < rideFlow.length; i++) {
            s1.data.push(rideFlow[i]);
            s2.data.push(saleFlow[i]);
        }

        let ss = [s1, s2];
        app.areaChart.setSerise(ss);

        for (let s in res.nodeStatus) {
            app.svg.setNodeWarning(s, res.nodeStatus[s]);
        }
        app.svg.updateSVGImageHref();

        {
            for (let i = 0; i < res.linePassengerFlowInfos.length; i++) {
                let info = res.linePassengerFlowInfos[i];
                if (!app.barChartMap.has(info.lineId)) {
                    let barChart: BarChart = new BarChart();
                    barChart.setX(i);
                    barChart.setY(0.25);
                    barChart.setWidth(1);
                    barChart.setHeight(0.3);
                    barChart.setFont(new FontStyle({ color: rgb(53, 214, 252) }));
                    barChart.setBackground(new BackgroundStyle({ enable: false }));
                    barChart.setTitle(`乘车客流(${info.lineName})`);
                    app.barChartMap.set(info.lineId, barChart);
                    app.addChild(barChart);
                }

                let chart: BarChart = app.barChartMap.get(info.lineId);
                let axis: Axis = new Axis({
                    border: new BorderStyle({ color: 'white', size: 1 }),
                    label: new FontStyle({ color: rgb(255,255,158) }),
                    data: info.stationNameList,
                });
                chart.setXAxis(axis);
                let s: Serise = new Serise({
                    data: info.passengerFlowList,
                });
                chart.setSerise([s]);
            }
        }

        {
            // bar chart 
            let xAxisData = [],
                seriseData = [];
            for (let i = 0; i < res.linePassengerFlowInfos.length; i++) {
                let info = res.linePassengerFlowInfos[i];
                for (let j = 0; j < info.stationNameList.length; j++) {
                    let val = j < info.passengerFlowList.length ? info.passengerFlowList[j] : 0;
                    xAxisData.push(info.stationNameList[j]);
                    seriseData.push(val);
                }
            }

            let xAxis: Axis = new Axis({
                    label: new FontStyle({ color: rgb(255,255,158) }),
                    data: xAxisData,
                }),
                serise: Serise = new Serise({
                    name: '乘车客流',
                    data: seriseData,
                });

            app.topChart.setXAxis(xAxis);
            app.topChart.setSerise([serise]);
        }

        {
            let xAxisData = [],
                seriseData = [];
            for (let i = 0; i < res.payTypePassengerInfos.length; i++)
            {
                let pieData = res.payTypePassengerInfos[i];
                xAxisData.push( { value: pieData.payTypeName, color: colors[i % colors.length] })
                seriseData.push(pieData.passCnt);
                // seriseData.push(parseInt(String(Math.random() * 10000)));
            }

            // pie chart
            app.pieChart.setXAxis(
                new Axis({
                    name: '票种',
                    label: new FontStyle({ color: 'white' }),
                    border: new BorderStyle({ color: 'white', size: 1 }),
                    data: xAxisData,
                })
            );
            app.pieChart.setSerise([new Serise({
                name: '全线网票卡使用情况',
                data: seriseData
            })])
        }
    });
};

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
    // '#00F5FF',
    // '#8B008B',
    // '#90EE90',
    // '#FFA500',
    // '#000B8B',
    // '#FF1493',
    // '#32CD32',
    // '#551A8B',
    // '#FF00FF',
    // '#FF0000',
    // '#8B0000',
];

getData();

let timer: Timer = new Timer();
timer.on(TimerEvent.NAME, (e) => {
    getData();
});
timer.start({ delay: 15 * 1000 });

let timer2: Timer = new Timer(),
    timer3 = new Timer({ delay: 80 });
timer2.on(TimerEvent.NAME, () => {
    let size = app.barChartMap.size - 1;
    if (size > 0) {
        timer3.off(TimerEvent.NAME).on(TimerEvent.NAME, () => {
            let needStop = false;
            let newXMap: Map<BarChart, number> = new Map();
            app.barChartMap.forEach((chart, lineId) => {
                let x = chart.getX() - 0.1;
                newXMap.set(chart, x);
                if (x < -size) {
                    needStop = true;
                }
            });
            if (needStop) {
                timer3.stop();
                newXMap.forEach((newX, chart) => {
                    if (newX < -size) {
                        chart.setX(size);
                    }
                });
            } else {
                newXMap.forEach((newX, chart) => {
                    chart.setX(newX);
                });
            }
        });
        timer3.start();
    }
});

timer2.start({ delay: 10000 });
