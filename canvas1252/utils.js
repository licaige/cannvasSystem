/**
 * 图像识别之泛洪填充算法
 * @param {*} start 点击x轴坐标
 * @param {*} end  点击y轴坐标
 * @param {*} width 识别区域宽度
 * @param {*} height 识别区域高度
 * @param {*} imageInfo 像素点组成的数组 uint8ClampedArray
 * @param {*} rgba 取色基准
 * @param {*} tolerance 容差范围
 * @returns
 */
export function floodFill(start, end, width, height, imageInfo, rgba, tolerance) {
  let x = Math.ceil(start);
  let y = Math.ceil(end);
  let stack = [];
  // 8个方向
  let dx = [0, 1, 1, 1, 0, -1, -1, -1];
  let dy = [-1, -1, 0, 1, 1, 1, 0, -1];
  let map = new Map(); // 标识已经处理过的像素点，防止重复处理
  // 如果开始像素符合条件，则将它放入栈中并标识为已处理
  let cell = (x + y * Math.ceil(width)) * 4;
  const group = [imageInfo[cell], imageInfo[cell + 1], imageInfo[cell + 2]];
  if (!isEmpty(group, rgba, tolerance)) {
    return; // 否则直接结束
  }
  // `x${x}y${y}`是一个不会重复的唯一标识id
  let firstPixi = `x${x}y${y}`;
  map.set(firstPixi, true);
  stack.push({ x, y });
  let p; // position
  while ((p = stack.pop())) {
    // 获取栈顶待处理的符合条件的像素的x与y值
    cell = (p.x + p.y * Math.ceil(width)) * 4;
    imageInfo[cell + 3] = 0; // 修改图片透明度为 0
    // 测试周围8个是否符合抠除条件
    for (let i = 0; i < 8; i++) {
      let nx = p.x + dx[i];
      let ny = p.y + dy[i];
      if (
        nx >= 0 &&
        nx < width &&
        ny >= 0 &&
        ny < height &&
        !map.get(`x${nx}y${ny}`)
      ) {
        cell = (nx + ny * Math.ceil(width)) * 4;
        const group = [
          imageInfo[cell],
          imageInfo[cell + 1],
          imageInfo[cell + 2],
        ];
        if (isEmpty(group, rgba, tolerance)) {
          map.set(`x${nx}y${ny}`, true); // 标识此像素已被处理
          // 没处理过则放入栈中
          stack.push({
            x: nx,
            y: ny,
          });
        }
      }
    }
  }
  map.clear();
}
/**
 * 判断数据区间近似相等
 * @param {*} current
 * @param {*} target
 * @param {*} range
 * @returns
 */
export function isEmpty(current, target, range = 1) {
  const [r1, g1, b1] = current;
  const [r2, g2, b2] = target;
  const d = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);
  return 1 - d / 255 / 3 > range;
}
/**
* 绘制折行文字
* @param {text}  - 矩形框文本内容
* @param {maxWidth}  - 矩形的宽度
*/
export function drawtext(text, maxWidth) {
  const isChina = (val) => /^[\u4e00-\u9fa5]+$/gi.test(val);
  let textArr = text.split("");
  let len = textArr.length;
  // 上个节点
  let previousNode = 0;
  // 记录节点宽度
  let nodeWidth = 0;
  // 文本换行数组
  let rowText = [];
  // 如果是字母，侧保存长度
  let letterWidth = 0;
  // 汉字宽度
  let chineseWidth = 21;
  // otherFont宽度
  let otherWidth = 10.5;
  for (let i = 0; i < len; i++) {
    if (isChina(textArr[i])) {
      if (letterWidth > 0) {
        if (nodeWidth + chineseWidth + letterWidth * otherWidth > maxWidth) {
          rowText.push({
            type: "text",
            content: text.substring(previousNode, i),
          });
          previousNode = i;
          nodeWidth = chineseWidth;
          letterWidth = 0;
        } else {
          nodeWidth += chineseWidth + letterWidth * otherWidth;
          letterWidth = 0;
        }
      } else {
        if (nodeWidth + chineseWidth > maxWidth) {
          rowText.push({
            type: "text",
            content: text.substring(previousNode, i),
          });
          previousNode = i;
          nodeWidth = chineseWidth;
        } else {
          nodeWidth += chineseWidth;
        }
      }
    } else {
      if (/\n/g.test(textArr[i])) {
        rowText.push({
          type: "break",
          content: text.substring(previousNode, i),
        });
        previousNode = i + 1;
        nodeWidth = 0;
        letterWidth = 0;
      } else if (textArr[i] == "\\" && textArr[i + 1] == "n") {
        rowText.push({
          type: "break",
          content: text.substring(previousNode, i),
        });
        previousNode = i + 2;
        nodeWidth = 0;
        letterWidth = 0;
      } else if (/[a-zA-Z0-9]/g.test(textArr[i])) {
        letterWidth += 1;
        if (nodeWidth + letterWidth * otherWidth > maxWidth) {
          rowText.push({
            type: "text",
            content: text.substring(previousNode, i + 1 - letterWidth),
          });
          previousNode = i + 1 - letterWidth;
          nodeWidth = letterWidth * otherWidth;
          letterWidth = 0;
        }
      } else {
        if (nodeWidth + otherWidth > maxWidth) {
          rowText.push({
            type: "text",
            content: text.substring(previousNode, i),
          });
          previousNode = i;
          nodeWidth = otherWidth;
        } else {
          nodeWidth += otherWidth;
        }
      }
    }
  }
  if (previousNode < len) {
    rowText.push({
      type: "text",
      content: text.substring(previousNode, len),
    });
  }
  return rowText;
}
export function cloneDeep(target) {
  let hash = new WeakMap()
  if (typeof target !== 'object' || target === null) {
    return target
  }
  if (target instanceof RegExp) return new RegExp(target)
  if (target instanceof Date) return new Date(target)
  if (hash.has(target)) return hash.get(target)
  const cloneTarget = Array.isArray(target) ? [] : {}
  hash.set(target, cloneTarget)
  for (let key of Object.keys(target)) {
    cloneTarget[key] = typeof target[key] === 'object' && target[key] !== null
      ? cloneDeep(target[key], hash) : target[key]
  }
  return cloneTarget
}