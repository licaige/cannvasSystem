$.getScript("./js/b.js",function (data) {
    addScript(data);
    $.getScript("./js/c.js",function (data) {
        addScript(data);
        init();
    });
});

function init() {
    Utils.getString();
    abc();
}

function addScript(data) {
    var script=document.createElement("script");
    script.textContent=data;
    document.body.appendChild(script);
}
