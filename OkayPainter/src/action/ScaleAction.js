/*
* @Date: 2020/4/7
* @Author: XueChengwu <xuechengwu@erayt.com>
* @Copyright: 2015-2019 Erayt, Inc.
* @Description: If you have some questions, please contact: xuechengwu@erayt.com.
*/
import Action from '../core/Action';

export default class extends Action {
  constructor(_duration, _scaleX, _scaleY) {
    super(_duration)
    this.scaleX = _scaleX
    this.scaleY = _scaleY
    this.detaX = (this.scaleX - 1)/this.duration
    this.detaY = (this.scaleY - 1)/this.duration
  }
  run(_sprite) {
    _sprite.scaleX += this.detaX
    _sprite.scaleY += this.detaY
    this.currentFrame--
    if(this.currentFrame > 0 && this.running) {
      setTimeout(()=>{this.run(_sprite)}, Math.round(1000/60))
    }
  }
}
