define(["b"],function ({Box}) {
    Box.prototype.plays=function () {
        this.b.style.position="absolute";
        this.b.style.left="200px";
    };
    return {Box:Box};
});