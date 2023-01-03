/*
function a(res) {
    res.write("1");
    res.end();
}
module.exports=a;*/
module.exports=(function () {
    return function (res) {
        res.write("1");
        res.end();
    }
})();