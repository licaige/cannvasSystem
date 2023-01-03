var Box = (function () {
    function Box(_r) {
        this.r = 6;
        var r = _r;
        this.r = _r;
        this.play();
    }
    Box.prototype.play = function () {
        return true;
    };
    return Box;
}());
