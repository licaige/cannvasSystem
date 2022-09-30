import EventEmitter from 'events';

let emitter = new EventEmitter();

const OChart = {
  on(name, func) {
    emitter.on(name, func);
  },
  emit(name, options) {
    emitter.emit(name, options);
  },
  VERSION: {
    PC: 'PC',
    MOBILE: 'MOBILE'
  },
  setVersion(version) {
    OChart.version = version;
  },
  version: 'PC',
  /**
   * 修改K线颜色
   * options: {
   *  lineType: (0:柱图，1:线图),
   *  up: {color:'上涨颜色', solid: '柱形是否空心'}，
   *  down: {color: '下跌颜色', solid: '柱形是否空心'}，
   *  lineColor: '线条颜色'
   * }
   * */
  setStyle(name, options) {
    emitter.emit(`${name}:setStyle`, options);
  },
  /**
   * 设置当前价格线样式
   * options: {
   *   visible: 是否展示
   *   color: '价格颜色',
   *   size: '字体大小',
   *   backgroundColor: '背景颜色'
   * }
   */
  setCurrentPriceStyle(name, options) {
    emitter.emit(`${name}:setCurrentPriceStyle`, options);
  },
  /**
   * 长按出十字相关
   * options: {
   *   visible: '是否显示十字，当十字在页面绘制时,可以关闭十字',
   *   color: 十字线条的颜色
   *   fontColor: 字体显示颜色
   *   backgroundColor: 十字字体背景颜色
   *   size: 十字字体大小
   *   onCurveLabel: 十字显示回调，要求返回{ vLabel, hLabel }表示垂直方向上的字符串
   *   onCurve: 十字出现回调
   *   onCurveEnd: 十字结束回调
   * }
   **/
  setCurve(name, options) {
    emitter.emit(`${name}:setCurve`, options);
  },
  /**画线相关**/
  drawLine(name, options) {
    // 绘制线条
    emitter.emit(`${name}:drawLine`, options);
  },
  deleteLine(name, uuid) {
    // 删除线条
    emitter.emit(`${name}:deleteLine`, {uuid});
  },
  editLine(name, options) {
    // 编辑线条
    // options.uuid 必填
    emitter.emit(`${name}:editLine`, options)
  },
  setOnDrawLineMove(name, callback) {
    // 设置线条移动回调函数
    emitter.emit(`${name}:onDrawLineMove`, { callback });
  },
  setOnDrawLineSelected(name, callback) {
    emitter.emit(`${name}:onDrawLineSelected`, { callback });
  },
  setOnDrawLineMoved(name, callback) {
    // 设置线条移动结束的回调函数
    emitter.emit(`${name}:onDrawLineMoved`, { callback });
  },
  /**画线结束**/
  /**牌价更新**/
  updateRate(name, options) {
    if (options.price !== undefined && options.ktype !== undefined) {
      emitter.emit(`${name}:updateRate`, options);
    } else {
      throw 'Error of OChart.updateRate: price and ktype is required';
    }
  },
  /**修改主图指标**/
  setMainQuota(name, quota) {
    emitter.emit(`${name}:setMainQuota`, { quota });
  },
  /**
   * 新增叠加层
   * @param name
   * @param options: {
   *  id: '自定义的ID,用于标识唯一叠加品种',
   *  data: '叠加的数据',
   *  up: {
   *    color: 阳柱颜色
   *    solid: 是否空心
   *  },
   *  down: {
   *    color: 阴柱颜色
   *    solid: 是否空心
   *  },
   *  lineType: 是否线条
   *  lineColor: 线条颜色
   *
   * }
   */
  addOverlying(name, options) {
    emitter.emit(`${name}:addOverlying`, options);
  },
  /**
   * 移除叠加层
   * @param name
   * @param overlyingId
   */
  removeOverlying(name, overlyingId) {
    emitter.emit(`${name}:removeOverlying`, {overlyingId});
  },
  /**
   * 更新叠加层数据，动态数据
   * @param name
   * @param options:{
   *   id: 叠加的ID
   *   price: 价格
   *   ktype: 时间类型
   * }
   */
  updateOverlyingRate(name, options) {
    emitter.emit(`${name}:updateOverlyingRate`, options);
  },
  /**
   * 添加水平线
   * @param name
   * @param options:
   * {
   *   onMove: 移动时的回调
   *   onSelected: 选中时的回调
   *   lines: [] 水平描述符
   * }
   */
  addHorizon(name, options) {
    emitter.emit(`${name}:addHorizon`, options);
  },
  /**
   * 设置水平线移动时的回调
   * @param name
   * @param onMove
   */
  setHorizonOnMove(name, onMove) {
    emitter.emit(`${name}:setHorizonOnMove`, { onMove });
  },
  /**
   * 设置水平线选中时回调
   * @param name
   * @param onSelected
   */
  setHorizonOnSelected(name, onSelected) {
    emitter.emit(`${name}:setHorizonOnSelected`, { onSelected });
  },
  /**
   * 删除水平线为id的水平线
   * @param name
   * @param id
   */
  removeHorizon(name, id) {
    emitter.emit(`${name}:removeHorizon`, { id });
  },
  /**
   * 设置技术指标指标
   * @param name
   * @param chartName
   * @param quote
   */
  setQuote(name, chartName, quote) {
    emitter.emit(`${name}:${chartName}:setQuote`, {name: quote});
  },
  /**
   * 设置指标坐标颜色
   * @param name
   * @param chartName
   * @param color
   */
  setQuoteColor(name, chartName, color) {
    emitter.emit(`${name}:${chartName}:setQuoteColor`, {color});
  },
  /**
   * 设置指标参数
   * @param name
   * @param chartName
   * @param params
   */
  setQuoteParams(name, chartName, params) {
    emitter.emit(`${name}:${chartName}:setQuoteParams`, params);
  },
  /**
   * 设置指标线的颜色
   * @param name
   * @param chartName
   * @param styles
   */
  setQuoteStyle(name, chartName, styles) {
    emitter.emit(`${name}:${chartName}:setQuoteStyle`, styles);
  },
  /**
   * @param name
   * @param chartName
   * @param shift
   */
  getQuote(name, chartName, shift, resolve) {
    emitter.emit(`${name}:${chartName}:getQuote`, {shift, resolve});
  },
  /**
   * 设置坐标轴样式
   * @param name
   * @param styles
   * {
   *
   * }
   */
  setAxisStyle(name, styles) {
    emitter.emit(`${name}:setAxisStyle`, styles);
  },
  /**
   * 更新分时图的数据
   * @param name
   * @param midRate
   */
  updateMinData(name, midRate) {
    emitter.emit(`${name}:updateMinData`, { midRate });
  },
  /**
   * 重置
   * @param name
   * @param callback
   */
  resize(name, callback) {
    emitter.emit(`${name}:resize`, { callback });
  },

};

export default OChart;
