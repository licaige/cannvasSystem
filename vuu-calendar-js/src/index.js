import {
    getTheDateInfo,
    getEveryMonthDays
} from './utils.js'


function Cer() {
}

Cer.prototype.getTheDateInfo = getTheDateInfo;

Cer.prototype.makePane = function (date) {

    let DATE = getTheDateInfo(date);

    // the month data
    let theMontData = [];
    for (let i = 0; i < DATE.gl_days; i++) {
        let a = DATE.gl_year + '-' + DATE.gl_month + '-' + (i + 1) + ' 00:00:00';
        theMontData.push(
            Object.assign(getTheDateInfo(a), {type: 0})
        )
    }

    // last month data
    let lastMonthData = [];
    if (DATE.day1Week > 0) {
        let lastM = DATE.gl_month - 1,
            lastY = DATE.gl_year;
        if (lastM <= 0) {
            lastM = 12;
            lastY -= 1
        }
        let days = getEveryMonthDays(lastY)[lastM - 1];
        for (let i = days - DATE.day1Week; i < days; i++) {
            let a = lastY + '-' + lastM + '-' + (i + 1) + ' 00:00:00';
            lastMonthData.push(
                Object.assign(getTheDateInfo(a), {type: -1})
            )
        }
    }

    // next month data
    let nextMothData = [];
    let ls = DATE.gl_days + DATE.day1Week;
    let lg = ls > 35 ? 42 : 35;
    if (ls > 28 && ls < lg) {
        let nextM = DATE.gl_month + 1,
            nextY = DATE.gl_year;
        if (nextM > 12) {
            nextM = 1;
            nextY += 1;
        }
        let ld = lg - ls;
        for (let i = 0; i < ld; i++) {
            let a = nextY + '-' + nextM + '-' + (i + 1) + ' 00:00:00';
            nextMothData.push(
                Object.assign(getTheDateInfo(a), {type: 1})
            )
        }
    }
    return Object.assign({
        pane: [].concat(lastMonthData, theMontData, nextMothData)
    }, DATE)
};


export default Cer
