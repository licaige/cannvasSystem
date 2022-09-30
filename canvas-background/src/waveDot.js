let allConfig = {}
let ctx = null
let imageData = null
let pixels = []

function getDotsCloud(dots) {
  // 初始化点云
  pixels = []
  // 创建点云
  const dotX = dots[0] ? dots[0] : 400
  const dotZ = dots[1] ? dots[1] : 250
  // for (let x = -dotX; x < dotX; x += 5) {
  //   for (let z = -dotZ; z < dotZ; z += 5) {
  //     pixels.push({ x, y: 100, z })
  //   }
  // }
  for (let x = -dotX; x < dotX; x += 5) {
    for (let z = -dotZ; z < dotZ; z += 5) {
      pixels.push({ x, y: 100, z })
    }
  }
}

function render(ts) {
  const { width, height } = allConfig
  const dotColor = allConfig.dots.color
  imageData = ctx.getImageData(0, 0, width, height)
  const fov = 250
  const len = pixels.length
  let pixel = null
  let scale = null
  let x2d = null
  let y2d = null
  let c = null
  for (let i = 0; i < len; i++) {
    pixel = pixels[i]
    scale = fov / (fov + pixel.z)
    x2d = pixel.x * scale + width / 2
    y2d = pixel.y * scale + height / 2
    if ((x2d >= 0 && x2d <= width) && (y2d >= 0 && y2d <= height)) {
      c = (Math.round(y2d) * width + Math.round(x2d)) * 4
      for (let j = 0; j < 4; j++) {
        imageData.data[c + j] = dotColor[j]
      }
    }
    pixel.z -= 0.2
    pixel.y = height / 14 + Math.sin((i / len) * 15 + (ts / 450)) * 10
    if (pixel.z < -fov) {
      pixel.z += 2 * fov
    }
  }
  ctx.putImageData(imageData, 0, 0)
}

function drawFrame(ts) {
  window.requestAnimationFrame(drawFrame)
  ctx.fillStyle = allConfig.bgColor
  ctx.fillRect(0, 0, allConfig.width, allConfig.height)
  render(ts)
}

function hex2rgba(color, alpha) {
  const rgba = []
  rgba.push(
    parseInt(color.substr(1, 2), 16),
    parseInt(color.substr(3, 2), 16),
    parseInt(color.substr(5, 2), 16),
  )
  if (alpha) {
    rgba.push(alpha * 255)
  } else {
    rgba.push(255)
  }
  return rgba
}

export default function waveDot(config) {
  // 预设值
  const bgColor = config.bgColor ? config.bgColor : ['#17293a']
  const x = config.dots.set[0] ? config.dots.set[0] : 400
  const y = config.dots.set[1] ? config.dots.set[1] : 250
  const z = config.dots.set[2] ? config.dots.set[2] : 100
  const color = config.dots.color ? config.dots.color : '#117AB5'
  const alpha = config.dots.alpha ? config.dots.alpha : 1
  // 装配设置项
  const dotColor = hex2rgba(color, alpha)
  // 根据设置重设参数
  const preConfig = {
    id: config.id ? config.id : 'canvas',
    width: config.width ? config.width : window.innerWidth,
    height: config.height ? config.height : window.innerHeight,
    bgColor,
    dots: {
      set: [x, y, z],
      color: dotColor
    }
  }
  // 设置全局配置
  allConfig = { ...preConfig }
  // 设置画布宽高
  const canvas = document.getElementById(config.id)
  canvas.width = config.width
  canvas.height = config.height
  // 设置画布类型，并初始化画布
  ctx = canvas.getContext('2d')
  getDotsCloud(allConfig.dots.set)
  drawFrame()
}
