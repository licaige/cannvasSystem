var http=require("http");
var querystring=require("querystring");
var server=http.createServer(function(req,res){
    var body="";
    req.on("data",function (data) {
        console.log(data);
        body+=data;
    });
    req.on("end",function () {
        body=querystring.parse(body);
        res.writeHead(200,{"Content-Type":"text/plain","Access-Control-Allow-Origin":"http://localhost:63342"});
       var obj={};
        // obj.a=Number(body.a)+10;
        // obj.b=Number(body.b)+20;
        var str=JSON.stringify(body);
        res.write(str);
        res.end();
    })
});
server.listen(3001,"10.9.25.176",function(){
    console.log("开始监听...");
});

