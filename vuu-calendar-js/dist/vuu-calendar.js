/*!
 * vuu-calendar.js v1.0.0
 * (c) 2018-2018 lihui zeng
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Cer = factory());
}(this, (function () { 'use strict';

    // 公历节日
    var GL_HOLIDAY = {
        "1-1": "元旦",
        "3-8": "妇女节",
        "3-12": "植树节",
        "5-1": "劳动节",
        "5-4": "青年节",
        "6-1": "儿童节",
        "7-1": "建党节",
        "8-1": "建军节",
        "9-10": "教师节",
        "10-1": "国庆节"
    };

    // 农历节日
    var NL_HOLIDAY = {
        "1-1": "春节",
        "1-15": "元宵节",
        "5-5": "端午节",
        "7-7": "乞巧节",
        "8-15": "中秋节",
        "9-9": "重阳节",
        "12-8": "腊八节",
        "12-23": "小年"
    };

    /**
     * 24节气速查表
     * @Array Of Property
     * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
     * @return Cn string
     */
    var solarTerm = ['\u5C0F\u5BD2', '\u5927\u5BD2', '\u7ACB\u6625', '\u96E8\u6C34', '\u60CA\u86F0', '\u6625\u5206', '\u6E05\u660E', '\u8C37\u96E8', '\u7ACB\u590F', '\u5C0F\u6EE1', '\u8292\u79CD', '\u590F\u81F3', '\u5C0F\u6691', '\u5927\u6691', '\u7ACB\u79CB', '\u5904\u6691', '\u767D\u9732', '\u79CB\u5206', '\u5BD2\u9732', '\u971C\u964D', '\u7ACB\u51AC', '\u5C0F\u96EA', '\u5927\u96EA', '\u51AC\u81F3'];

    /**
     * 天干地支之地支速查表<=>生肖
     * @Array Of Property
     * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
     * @return Cn string
     */
    var Animals = ['\u9F20', '\u725B', '\u864E', '\u5154', '\u9F99', '\u86C7', '\u9A6C', '\u7F8A', '\u7334', '\u9E21', '\u72D7', '\u732A'];

    /**
     * 数字转中文速查表
     * @Array Of Property
     * @trans ['日','一','二','三','四','五','六','七','八','九','十']
     * @return Cn string
     */
    var nStr1 = ['\u65E5', '\u4E00', '\u4E8C', '\u4E09', '\u56DB', '\u4E94', '\u516D', '\u4E03', '\u516B', '\u4E5D', '\u5341'];

    /**
     * 日期转农历称呼速查表
     * @Array Of Property
     * @trans ['初','十','廿','卅']
     * @return Cn string
     */
    var nStr2 = ['\u521D', '\u5341', '\u5EFF', '\u5345'];

    /**
     * 月份转农历称呼速查表
     * @Array Of Property
     * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
     * @return Cn string
     */
    var nStr3 = ['\u6B63', '\u4E8C', '\u4E09', '\u56DB', '\u4E94', '\u516D', '\u4E03', '\u516B', '\u4E5D', '\u5341', '\u51AC', '\u814A'];

    /**
     * 天干地支之天干速查表
     * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
     * @return Cn string
     */
    var Gan = ['\u7532', '\u4E59', '\u4E19', '\u4E01', '\u620A', '\u5DF1', '\u5E9A', '\u8F9B', '\u58EC', '\u7678'];
    /**
     * 天干地支之地支速查表
     * @Array Of Property
     * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
     * @return Cn string
     */
    var Zhi = ['\u5B50', '\u4E11', '\u5BC5', '\u536F', '\u8FB0', '\u5DF3', '\u5348', '\u672A', '\u7533', '\u9149', '\u620C', '\u4EA5'];

    /**
     * 1900-2100各年的24节气日期速查表
     * @Array Of Property
     * @return 0x string For splice
     */
    var sTermInfo = ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e', '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'];

    var lunarInfo = [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, //1900-1909
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, //1910-1919
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, //1920-1929
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, //1930-1939
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, //1940-1949
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, //1950-1959
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, //1960-1969
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, //1970-1979
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, //1980-1989
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, //1990-1999
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, //2000-2009
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, //2010-2019
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, //2020-2029
    0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, //2030-2039
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, //2040-2049
    0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, //2050-2059
    0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, //2060-2069
    0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, //2070-2079
    0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, //2080-2089
    0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, //2090-2099
    0x0d520];

    /**
     * 返回农历y年一整年的总天数
     * @param  y - 年
     * @return Number
     * @eg:var count = getNlYearDays(1987) ; count=387
     */
    function getNlYearDays(y) {
        var i = void 0,
            sum = 348;
        for (i = 0x8000; i > 0x8; i >>= 1) {
            sum += lunarInfo[y - 1900] & i ? 1 : 0;
        }
        return sum + getNlLeapDays(y);
    }

    /**
     * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
     * @param  y - 年
     * @return Number (0-12)
     * @eg:var getNlLeapMonth = getNlLeapMonth(1987) ;//getNlLeapMonth=6
     */
    function getNlLeapMonth(y) {
        return lunarInfo[y - 1900] & 0xf;
    }

    /**
     * 返回农历y年闰月的天数 若该年没有闰月则返回0
     * @param  y -年
     * @return Number (0、29、30)
     * @eg:var leapMonthDay = getNlLeapDays(1987) ;//leapMonthDay=29
     */
    function getNlLeapDays(y) {
        if (getNlLeapMonth(y)) {
            return lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
        }
        return 0;
    }

    /**
     * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
     * @param  year - month
     * @return Number (-1、29、30)
     * @eg:var MonthDay = getNlMonthDays(1987,9) ;//MonthDay=29
     */
    function getNlMonthDays(y, m) {
        if (m > 12 || m < 1) {
            return -1;
        } //月份参数从1至12，参数错误返回-1
        return lunarInfo[y - 1900] & 0x10000 >> m ? 30 : 29;
    }

    /**
     * 农历年份转换为干支纪年
     * @param  lYear 农历年的年份数
     * @return Cn string
     */
    function toGanZhiYear(lYear) {
        var ganKey = (lYear - 3) % 10;
        var zhiKey = (lYear - 3) % 12;
        if (ganKey === 0) ganKey = 10; //如果余数为0则为最后一个天干
        if (zhiKey === 0) zhiKey = 12; //如果余数为0则为最后一个地支
        return Gan[ganKey - 1] + Zhi[zhiKey - 1];
    }

    /**
     * 传入公历(!)y年获得该年第n个节气的公历日期
     * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
     * @return day Number
     * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
     */
    function getTerm(y, n) {
        var _table = sTermInfo[y - 1900];
        var _info = [parseInt('0x' + _table.substr(0, 5)).toString(), parseInt('0x' + _table.substr(5, 5)).toString(), parseInt('0x' + _table.substr(10, 5)).toString(), parseInt('0x' + _table.substr(15, 5)).toString(), parseInt('0x' + _table.substr(20, 5)).toString(), parseInt('0x' + _table.substr(25, 5)).toString()];
        var _calday = [_info[0].substr(0, 1), _info[0].substr(1, 2), _info[0].substr(3, 1), _info[0].substr(4, 2), _info[1].substr(0, 1), _info[1].substr(1, 2), _info[1].substr(3, 1), _info[1].substr(4, 2), _info[2].substr(0, 1), _info[2].substr(1, 2), _info[2].substr(3, 1), _info[2].substr(4, 2), _info[3].substr(0, 1), _info[3].substr(1, 2), _info[3].substr(3, 1), _info[3].substr(4, 2), _info[4].substr(0, 1), _info[4].substr(1, 2), _info[4].substr(3, 1), _info[4].substr(4, 2), _info[5].substr(0, 1), _info[5].substr(1, 2), _info[5].substr(3, 1), _info[5].substr(4, 2)];
        return parseInt(_calday[n - 1]);
    }

    /**
     * 传入offset偏移量返回干支
     * @param offset 相对甲子的偏移量
     * @return Cn string
     */
    function toGanZhi(offset) {
        return Gan[offset % 10] + Zhi[offset % 12];
    }

    /**
     * 公历月、日判断所属星座
     * @param  cMonth [description]
     * @param  cDay [description]
     * @return Cn string
     */
    function toAstro(cMonth, cDay) {
        var s = '\u9B54\u7FAF\u6C34\u74F6\u53CC\u9C7C\u767D\u7F8A\u91D1\u725B\u53CC\u5B50\u5DE8\u87F9\u72EE\u5B50\u5904\u5973\u5929\u79E4\u5929\u874E\u5C04\u624B\u9B54\u7FAF';
        var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
        return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + '\u5EA7';
    }

    /**
     * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
     * @param y year
     * @return Cn string
     * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
     */
    function getAnimal(y) {
        return Animals[(y - 4) % 12];
    }

    /**
     * 传入农历数字月份返回汉语通俗表示法
     * @param lunar month
     * @return Cn string
     * @eg:var cnMonth = toChinaMonth(12) ;//cnMonth='腊月'
     */
    function toChinaMonth(m) {
        // 月 => \u6708
        if (m > 12 || m < 1) {
            return -1;
        } //若参数错误 返回-1
        var s = nStr3[m - 1];
        s += '\u6708'; //加上月字
        return s;
    }

    /**
     * 传入农历日期数字返回汉字表示法
     * @param  day
     * @return Cn string
     * @eg:var cnDay = toChinaDay(21) ;//cnMonth='廿一'
     */
    function toChinaDay(d) {
        //日 => \u65e5
        var s = void 0;
        switch (d) {
            case 10:
                s = '\u521D\u5341';
                break;
            case 20:
                s = '\u4E8C\u5341';
                break;
            case 30:
                s = '\u4E09\u5341';
                break;
            default:
                s = nStr2[Math.floor(d / 10)];
                s += nStr1[d % 10];
        }
        return s;
    }

    /**
     * 返回当天的所有日期信息
     * @param date - string
     * @return object
     */
    function getTheDateInfo(date) {

        date ? date = date.replace(/-/g, "/") : date;
        date = date ? new Date(date) : new Date();

        var i = void 0,
            temp = 0,
            gl_year = date.getFullYear(),
            gl_month = date.getMonth() + 1,
            gl_day = date.getDate();

        var offset = (Date.UTC(gl_year, gl_month - 1, gl_day) - Date.UTC(1900, 0, 31)) / 86400000;
        for (i = 1900; i < 2101 && offset > 0; i++) {
            temp = getNlYearDays(i, lunarInfo);
            offset -= temp;
        }

        if (offset < 0) {
            offset += temp;
            i--;
        }

        //农历年
        var nl_year = i;
        var leap = getNlLeapMonth(i); //闰年哪个月
        var isLeap = false;

        //效验闰月
        for (i = 1; i < 13 && offset > 0; i++) {
            //闰月
            if (leap > 0 && i == leap + 1 && isLeap == false) {
                --i;
                isLeap = true;
                temp = getNlLeapDays(nl_year); //计算农历闰月天数
            } else {
                temp = getNlMonthDays(nl_year, i); //计算农历普通月天数
            }
            //解除闰月
            if (isLeap && i == leap + 1) {
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
        var nl_month = i;
        //农历日
        var nl_day = offset + 1;

        //月柱 1900年1月小寒以前为 丙子月(60进制12)
        var firstNode = getTerm(nl_year, gl_month * 2 - 1); //返回当月「节」为几日开始
        var secondNode = getTerm(nl_year, gl_month * 2); //返回当月「节」为几日开始

        //传入的日期的节气与否
        var Term = null;
        if (firstNode === gl_day) {
            Term = solarTerm[gl_month * 2 - 2];
        }
        if (secondNode === gl_day) {
            Term = solarTerm[gl_month * 2 - 1];
        }

        //日柱 当月一日与 1900/1/1 相差天数
        var dayCyclical = Date.UTC(gl_year, gl_month - 1, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;

        return {
            nl_year: nl_year,
            nl_month: nl_month,
            nl_day: nl_day,
            gl_year: gl_year,
            gl_month: gl_month,
            gl_day: gl_day,
            isLeap: isLeap,
            Term: Term, // 节气
            timestamp: Date.parse(date) / 1000,
            holiday: GL_HOLIDAY[gl_month + '-' + gl_day] || null,
            nl_holiday: NL_HOLIDAY[nl_month + '-' + nl_day] || null,
            animal: getAnimal(nl_year),
            nl_month_cn: (isLeap ? '\u95F0' : '') + toChinaMonth(nl_month),
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
    function isLeap(year) {
        return year % 4 === 0 ? year % 100 !== 0 ? 1 : year % 400 === 0 ? 1 : 0 : 0;
    }

    /**
     * 获取当前日期这个月1号是星期几
     * @return number week
     **/
    function getDay1Week(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    }

    /**
     * 获取当前年份每个月对应天数
     * @return array
     * */
    function getEveryMonthDays(year) {
        return [31, 28 + isLeap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }

    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "H+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }return fmt;
    };

    function Cer() {}

    Cer.prototype.getTheDateInfo = getTheDateInfo;

    Cer.prototype.makePane = function (date) {

        var DATE = getTheDateInfo(date);

        // the month data
        var theMontData = [];
        for (var i = 0; i < DATE.gl_days; i++) {
            var a = DATE.gl_year + '-' + DATE.gl_month + '-' + (i + 1) + ' 00:00:00';
            theMontData.push(Object.assign(getTheDateInfo(a), { type: 0 }));
        }

        // last month data
        var lastMonthData = [];
        if (DATE.day1Week > 0) {
            var lastM = DATE.gl_month - 1,
                lastY = DATE.gl_year;
            if (lastM <= 0) {
                lastM = 12;
                lastY -= 1;
            }
            var days = getEveryMonthDays(lastY)[lastM - 1];
            for (var _i = days - DATE.day1Week; _i < days; _i++) {
                var _a = lastY + '-' + lastM + '-' + (_i + 1) + ' 00:00:00';
                lastMonthData.push(Object.assign(getTheDateInfo(_a), { type: -1 }));
            }
        }

        // next month data
        var nextMothData = [];
        var ls = DATE.gl_days + DATE.day1Week;
        var lg = ls > 35 ? 42 : 35;
        if (ls > 28 && ls < lg) {
            var nextM = DATE.gl_month + 1,
                nextY = DATE.gl_year;
            if (nextM > 12) {
                nextM = 1;
                nextY += 1;
            }
            var ld = lg - ls;
            for (var _i2 = 0; _i2 < ld; _i2++) {
                var _a2 = nextY + '-' + nextM + '-' + (_i2 + 1) + ' 00:00:00';
                nextMothData.push(Object.assign(getTheDateInfo(_a2), { type: 1 }));
            }
        }
        return Object.assign({
            pane: [].concat(lastMonthData, theMontData, nextMothData)
        }, DATE);
    };

    return Cer;

})));
