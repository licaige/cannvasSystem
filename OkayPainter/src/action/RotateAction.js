/*
* @Date: 2020/4/7
* @Author: XueChengwu <xuechengwu@erayt.com>
* @Copyright: 2015-2019 Erayt, Inc.
* @Description: If you have some questions, please contact: xuechengwu@erayt.com.
*/
import Action from '../core/Action';

export default class extends Action {
  constructor(_duration, _rotate) {
    super(_duration)
    this.rotate = _rotate
    this.deta = _rotate / this.duration
  }
  run(_sprite) {
    _sprite.rotation += this.deta
    this.currentFrame--
    if(this.currentFrame > 0 && this.running) {
      setTimeout(()=>{this.run(_sprite)}, Math.round(1000/60))
    }
  }
}
