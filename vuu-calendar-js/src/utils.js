import {
    GL_HOLIDAY,
    NL_HOLIDAY,
    lunarInfo,
    Gan,
    Zhi,
    solarTerm,
    sTermInfo,
    Animals,
    nStr1,
    nStr2,
    nStr3
} from './var.js'


/**
 * 返回农历y年一整年的总天数
 * @param  y - 年
 * @return Number
 * @eg:var count = getNlYearDays(1987) ; count=387
 */
export  function getNlYearDays(y) {
    let i, sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) {
        sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
    }
    return (sum + getNlLeapDays(y));
}



/**
 * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
 * @param  y - 年
 * @return Number (0-12)
 * @eg:var getNlLeapMonth = getNlLeapMonth(1987) ;//getNlLeapMonth=6
 */
export function getNlLeapMonth(y) {
    return (lunarInfo[y - 1900] & 0xf);
}

/**
 * 返回农历y年闰月的天数 若该年没有闰月则返回0
 * @param  y -年
 * @return Number (0、29、30)
 * @eg:var leapMonthDay = getNlLeapDays(1987) ;//leapMonthDay=29
 */
export function getNlLeapDays(y) {
    if (getNlLeapMonth(y)) {
        return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
    }
    return (0);
}

/**
 * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
 * @param  year - month
 * @return Number (-1、29、30)
 * @eg:var MonthDay = getNlMonthDays(1987,9) ;//MonthDay=29
 */
export function getNlMonthDays(y, m) {
    if (m > 12 || m < 1) {
        return -1
    }//月份参数从1至12，参数错误返回-1
    return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
}

/**
 * 农历年份转换为干支纪年
 * @param  lYear 农历年的年份数
 * @return Cn string
 */
export function toGanZhiYear(lYear) {
    let ganKey = (lYear - 3) % 10;
    let zhiKey = (lYear - 3) % 12;
    if (ganKey === 0) ganKey = 10;//如果余数为0则为最后一个天干
    if (zhiKey === 0) zhiKey = 12;//如果余数为0则为最后一个地支
    return Gan[ganKey - 1] + Zhi[zhiKey - 1];
}

/**
 * 传入公历(!)y年获得该年第n个节气的公历日期
 * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
 * @return day Number
 * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
 */
export function getTerm(y, n) {
    let _table = sTermInfo[y - 1900];
    let _info = [
        parseInt('0x' + _table.substr(0, 5)).toString(),
        parseInt('0x' + _table.substr(5, 5)).toString(),
        parseInt('0x' + _table.substr(10, 5)).toString(),
        parseInt('0x' + _table.substr(15, 5)).toString(),
        parseInt('0x' + _table.substr(20, 5)).toString(),
        parseInt('0x' + _table.substr(25, 5)).toString()
    ];
    let _calday = [
        _info[0].substr(0, 1),
        _info[0].substr(1, 2),
        _info[0].substr(3, 1),
        _info[0].substr(4, 2),

        _info[1].substr(0, 1),
        _info[1].substr(1, 2),
        _info[1].substr(3, 1),
        _info[1].substr(4, 2),

        _info[2].substr(0, 1),
        _info[2].substr(1, 2),
        _info[2].substr(3, 1),
        _info[2].substr(4, 2),

        _info[3].substr(0, 1),
        _info[3].substr(1, 2),
        _info[3].substr(3, 1),
        _info[3].substr(4, 2),

        _info[4].substr(0, 1),
        _info[4].substr(1, 2),
        _info[4].substr(3, 1),
        _info[4].substr(4, 2),

        _info[5].substr(0, 1),
        _info[5].substr(1, 2),
        _info[5].substr(3, 1),
        _info[5].substr(4, 2),
    ];
    return parseInt(_calday[n - 1]);
}

/**
 * 传入offset偏移量返回干支
 * @param offset 相对甲子的偏移量
 * @return Cn string
 */
export function toGanZhi(offset) {
    return Gan[offset % 10] + Zhi[offset % 12];
}

/**
 * 公历月、日判断所属星座
 * @param  cMonth [description]
 * @param  cDay [description]
 * @return Cn string
 */
export function toAstro(cMonth, cDay) {
    let s = "\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf";
    let arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5ea7";
}

/**
 * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
 * @param y year
 * @return Cn string
 * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
 */
export function getAnimal(y) {
    return Animals[(y - 4) % 12]
}

/**
 * 传入农历数字月份返回汉语通俗表示法
 * @param lunar month
 * @return Cn string
 * @eg:var cnMonth = toChinaMonth(12) ;//cnMonth='腊月'
 */
export function toChinaMonth(m) { // 月 => \u6708
    if (m > 12 || m < 1) {
        return -1
    } //若参数错误 返回-1
    let s = nStr3[m - 1];
    s += "\u6708";//加上月字
    return s;
}

/**
 * 传入农历日期数字返回汉字表示法
 * @param  day
 * @return Cn string
 * @eg:var cnDay = toChinaDay(21) ;//cnMonth='廿一'
 */
export function toChinaDay(d) { //日 => \u65e5
    let s;
    switch (d) {
        case 10:
            s = '\u521d\u5341';
            break;
        case 20:
            s = '\u4e8c\u5341';
            break;
        case 30:
            s = '\u4e09\u5341';
            break;
        default :
            s = nStr2[Math.floor(d / 10)];
            s += nStr1[d % 10];
    }
    return (s);
}

/**
 * 返回当天的所有日期信息
 * @param date - string
 * @return object
 */
export function getTheDateInfo(date) {

    date ? date = date.replace(/-/g, "/") : date;
    date = date ? new Date(date) : new Date();

    let i,
        temp = 0,
        gl_year = date.getFullYear(),
        gl_month = date.getMonth() + 1,
        gl_day = date.getDate();


    let offset = (Date.UTC(gl_year, gl_month - 1, gl_day) - Date.UTC(1900, 0, 31)) / 86400000;
    for (i = 1900; i < 2101 && offset > 0; i++) {
        temp = getNlYearDays(i, lunarInfo);
        offset -= temp;
    }

    if (offset < 0) {
        offset += temp;
        i--;
    }

    //农历年
    let nl_year = i;
    let leap = getNlLeapMonth(i); //闰年哪个月
    let isLeap = false;

    //效验闰月
    for (i = 1; i < 13 && offset > 0; i++) {
        //闰月
        if (leap > 0 && i == (leap + 1) && isLeap == false) {
            --i;
            isLeap = true;
            temp = getNlLeapDays(nl_year); //计算农历闰月天数
        } else {
            temp = getNlMonthDays(nl_year, i);//计算农历普通月天数
        }
        //解除闰月
        if (isLeap && i == (leap + 1)) {
            isLeap = false;
        }
        offset -= temp;
    }

    if (offset == 0 && leap > 0 && i == leap + 1) {
        if (isLeap) {
            isLeap = false;
        } else {
            isLeap = true;
            --i;
        }
    }

    if (offset < 0) {
        offset += temp;
        --i;
    }


    //农历月
    let nl_month = i;
    //农历日
    let nl_day = offset + 1;

    //月柱 1900年1月小寒以前为 丙子月(60进制12)
    let firstNode = getTerm(nl_year, (gl_month * 2 - 1));//返回当月「节」为几日开始
    let secondNode = getTerm(nl_year, (gl_month * 2));//返回当月「节」为几日开始

    //传入的日期的节气与否
    let Term = null;
    if (firstNode === gl_day) {
        Term = solarTerm[gl_month * 2 - 2];
    }
    if (secondNode === gl_day) {
        Term = solarTerm[gl_month * 2 - 1];
    }

    //日柱 当月一日与 1900/1/1 相差天数
    let dayCyclical = Date.UTC(gl_year, gl_month - 1, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;

    return {
        nl_year,
        nl_month,
        nl_day,
        gl_year,
        gl_month,
        gl_day,
        isLeap,
        Term,  // 节气
        timestamp: Date.parse(date) / 1000,
        holiday: GL_HOLIDAY[gl_month + '-' + gl_day] || null,
        nl_holiday: NL_HOLIDAY[nl_month + '-' + nl_day] || null,
        animal: getAnimal(nl_year),
        nl_month_cn: (isLeap ? "\u95f0" : '') + toChinaMonth(nl_month),
        nl_day_cn: toChinaDay(nl_day),
        gl_days: getEveryMonthDays(gl_year)[gl_month - 1],
        day1Week: getDay1Week(date),
        gz_year: toGanZhiYear(nl_year),
        gz_month: toGanZhi((gl_year - 1900) * 12 + gl_month + (gl_day >= firstNode ? 12 : 11)),
        gz_day: toGanZhi(dayCyclical + gl_day - 1),
        astro: toAstro(gl_month, gl_day) // 星座
    };
}

/**
 * 判断当前年份是否是闰年
 * @return number 1是 0否
 * */
export function isLeap(year) {
    return year % 4 === 0 ? (year % 100 !== 0 ? 1 : (year % 400 === 0 ? 1 : 0)) : 0;
}

/**
 * 获取当前日期这个月1号是星期几
 * @return number week
 **/
export function getDay1Week(date) {
    return (new Date(date.getFullYear(), date.getMonth(), 1)).getDay()
}

/**
 * 获取当前年份每个月对应天数
 * @return array
 * */
export function getEveryMonthDays(year) {
    return [31, 28 + isLeap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}


Date.prototype.Format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
