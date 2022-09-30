function setImgSlide(can, imgUrl, sec) {
  let canvas = can
  // const cliW = document.body.clientWidth;
  // const cliH = document.body.clientHeight;
  const cliW = 300
  const cliH = 300
  const GRANULARITYX = 50
  const GRANULARITYY = 50
  const SPEEDMIN = 0.5
  const SPEEDMAX = 2
  const MAXSTEP = 0.4
  const MINSTEP = 0.1
  let sourceList = []
  let realPlace = []
  let currentPlace = []
  canvas.width = cliW
  canvas.height = cliH
  let ctx = canvas.getContext('2d')
  let randomAnim = function () {}
  let orderAnim = function () {}

  let img = new Image()
  img.src = imgUrl

  img.onload = function () {
    sourceList = distribution(img)
    let imgPos = getImgPos(img.width, img.height)
    realPlace = getPosition(sourceList, imgPos.left, imgPos.top)
    // currentPlace = randomPosition(sourceList);
    currentPlace = realPlace
    rander(realPlace)
    // rander(currentPlace);
    // run();
    // ctx.clearRect(0, 0, cliW, cliH);
  }

  function getImgPos(wid, hei) {
    let pos = {}
    pos.left = cliW / 2 - wid / 2
    pos.top = cliH / 5
    return pos
  }

  function rander(destList) {
    let len = sourceList.length
    for (let i = 0; i < len; i++) {
      let source = sourceList[i]
      let dest = destList[i]
      ctx.drawImage(
        img,
        source.x,
        source.y,
        source.xs,
        source.ys,
        dest.x,
        dest.y,
        source.xs,
        source.ys
      )
    }
  }

  function distribution(img) {
    let list = []
    let imgW = img.width
    let imgH = img.height
    let perW = imgW / GRANULARITYX
    let perH = imgH / GRANULARITYY
    for (let i = 0; i < GRANULARITYY; i++) {
      for (let j = 0; j < GRANULARITYX; j++) {
        let step = randomStep()
        let data = {
          x: j * perW,
          y: i * perH,
          xs: perW,
          ys: perH,
          speedX: randomSpeed(),
          speedY: randomSpeed(),
          stepX: step.stepX,
          stepY: step.stepY,
        }
        list.push(data)
      }
    }
    return list
  }

  function randomSpeed() {
    return Math.random() * (SPEEDMAX - SPEEDMIN) + SPEEDMIN
  }

  function getPosition(list, x, y) {
    let len = list.length
    let arr = []
    for (let i = 0; i < len; i++) {
      let cur = list[i]
      let numX = i % GRANULARITYX
      let numY = parseInt(i / GRANULARITYY)
      let data = {
        x: cur.x + x,
        y: cur.y + y,
        // x: cur.x + x + numX,
        // y: cur.y + y + numY
      }
      arr.push(data)
    }
    return arr
  }

  function randomPosition(list) {
    let len = list.length
    let arr = []
    for (let i = 0; i < len; i++) {
      let per = list[i]
      let sour = sourceList[i]
      let data = {}
      data.x = collisionDetection(Math.random() * cliW, sour.xs, cliW)
      data.y = collisionDetection(Math.random() * cliH, sour.ys, cliH)
      arr.push(data)
    }
    return arr
  }

  function randomMove(list) {
    let len = list.length
    let arr = []
    for (let i = 0; i < len; i++) {
      let per = list[i]
      let sour = sourceList[i]
      let data = {}
      data.x = reverseDir(per.x + sour.stepX, sour.xs, cliW, i, 'stepX')
      data.y = reverseDir(per.y + sour.stepY, sour.ys, cliH, i, 'stepY')
      arr.push(data)
    }
    return arr
  }

  function reverseDir(pos, leng, bor, index, keyName) {
    let newPos = pos
    if (pos < 0) {
      newPos = 0
      sourceList[index][keyName] = -sourceList[index][keyName]
    }
    if (pos + leng > bor) {
      newPos = bor - leng
      sourceList[index][keyName] = -sourceList[index][keyName]
    }
    return newPos
  }

  // 碰撞检测
  function collisionDetection(pos, leng, bor) {
    let newPos = pos
    if (pos < 0) {
      newPos = 0
    }
    if (pos + leng > bor) {
      newPos = bor - leng
    }
    return newPos
  }

  function resetPosition(sour, targ) {
    let len = sour.length
    let arr = []
    for (let i = 0; i < len; i++) {
      let data = {}
      data.x = handleDis(sour[i].x, targ[i].x, sourceList[i].speedX)
      data.y = handleDis(sour[i].y, targ[i].y, sourceList[i].speedY)
      arr.push(data)
    }
    return arr
  }

  function handleDis(perv, next, step) {
    let dis = null
    let diff = perv - next
    if (diff < 0) {
      dis = perv + step
    } else if (diff > 0) {
      dis = perv - step
    } else {
      dis = next
    }
    if (Math.abs(diff) < step) {
      dis = next
    }
    return dis
  }

  //随机步长
  function randomStep() {
    let randomDX = Math.random() * 3 < 1 ? '-' : ''
    let randomDY = Math.random() * 3 < 1 ? '-' : ''
    return {
      stepX: parseFloat(
        randomDX + Math.random() * (MAXSTEP - MINSTEP) + MINSTEP
      ),
      stepY: parseFloat(
        randomDY + Math.random() * (MAXSTEP - MINSTEP) + MINSTEP
      ),
    }
  }

  function run() {
    ctx.clearRect(0, 0, cliW, cliH)
    currentPlace = resetPosition(currentPlace, realPlace)
    rander(currentPlace)
    orderAnim = requestAnimationFrame(run)
  }

  function move() {
    ctx.globalAlpha = (ctx.globalAlpha - 0.005).toFixed(3)
    ctx.clearRect(0, 0, cliW, cliH)
    currentPlace = randomMove(currentPlace)
    rander(currentPlace)
    if (ctx.globalAlpha > 0) {
      randomAnim = requestAnimationFrame(move)
    } else {
      cancelAnimationFrame(randomAnim)
    }
  }
  let bool = true
  setTimeout(() => {
    move()
  }, sec)
  // document.onclick = function () {
  //   if (bool) {
  //     cancelAnimationFrame(orderAnim);
  //     move();
  //     bool = !bool;
  //   } else {
  //     cancelAnimationFrame(randomAnim);
  //     run();
  //     bool = !bool;
  //   }
  // }
}

setImgSlide(document.getElementById('leftCan'), '/img/girl_3.jpg', 2000)
setImgSlide(document.getElementById('frontCan'), '/img/girl_4.jpg', 5000)
setImgSlide(document.getElementById('rightCan'), '/img/girl_2.jpg', 8000)
setImgSlide(document.getElementById('backCan'), '/img/girl_1.png', 11000)
