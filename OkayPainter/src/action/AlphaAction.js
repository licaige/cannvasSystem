/*
* @Date: 2020/4/7
* @Author: XueChengwu <xuechengwu@erayt.com>
* @Copyright: 2015-2019 Erayt, Inc.
* @Description: If you have some questions, please contact: xuechengwu@erayt.com.
*/
import Action from '../core/Action';

export default class extends Action {
  constructor(_duration, _alpha) {
    super(_duration)
    this.alpha = _alpha
    this.delta = (this.alpha - 1) / this.duration
  }
  run(_sprite) {
    _sprite.alpha += this.delta
    _sprite.alpha < 0?_sprite.alpha = 0:undefined
    this.currentFrame--
    if(this.currentFrame > 0 && this.running) {
      setTimeout(()=>{this.run(_sprite)}, Math.round(1000/60))
    }
  }
}
