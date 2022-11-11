export function idToRgba(id: string) {
  return id.split("-");
}

export function rgbaToId(rgba: [number, number, number, number]) {
  return rgba.join("-");
}
// 避免 id 重复
const idPool = {};

export function createId(): string {
  let id = createOnceId();
  //如果创建的id在idPool中已经有了，就新搞一个id，主要是为了避免重复
  while (idPool[id]) {
    id = createOnceId();
  }
  return id;
}

function createOnceId(): string {
  return Array(3)
    .fill(0)
    .map(() => Math.ceil(Math.random() * 255))
    .concat(255)
    .join("-");
}
//原理很简单，rgba 的 r、g、b 的范围是 0~255，我们生成 3 个 0~255 的随机数即可。对于透明度 a 值则必须为 1（不透明），
// 否则当两个形状重叠时，重叠部分的 rgba 将被混合，会影响命中的判断，这里为方便转换，a 默认给了 255
