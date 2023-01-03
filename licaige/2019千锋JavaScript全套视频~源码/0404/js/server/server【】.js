var http=require("http");
var queryStr=require("querystring");
var server;
var route;
function start(_route) {
    route=_route;
    server=http.createServer(createServer);
    server.listen(3005,"10.9.25.176",function () {
        console.log("开启服务");
    })
}
function createServer(req,res) {
    req.on("data",function (_data) {

    });
    req.on("end",function () {
        console.log(req.url);
        var obj=queryStr.parse(req.url.split("?")[1]);
        res.writeHeader(200,{"content-type":"text/html","Access-Control-Allow-Origin":"*"});
        if(Number(obj.type)===1){
            route.a(res);
        }else if(Number(obj.type)===2){
            route.b(res);
        }
    })
}
exports.start=start;