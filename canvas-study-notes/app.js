new Vue({
  el:"#vue-app",
  data:{
  }
});
const _sto = setInterval;
window.setInterval = function (callback,timeout,params){
  const args = Array.prototype.slice.call(arguments,2);
  const _cb = function () {
    callback.apply(null,args);
  }
  _sto(_cb,timeout);
}