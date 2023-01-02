var http=require("http");
var querystring=require("querystring");
var server=http.createServer(function(req,res){
    req.on("data",function (data) {

    });
    req.on("end",function () {
        var dataObj=querystring.parse(req.url.split("?")[1]);
        res.writeHead(200,{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"});
        // var str=(Number(dataList.a)+10)+"&"+(Number(dataList.b)+20);
        dataObj.a=Number(dataObj.a)+10;
        dataObj.b=Number(dataObj.b)+20;
        res.write(JSON.stringify(dataObj));
        res.end();
    })
});
server.listen(3000,"10.9.25.176",function(){
    console.log("开始监听...");
});

