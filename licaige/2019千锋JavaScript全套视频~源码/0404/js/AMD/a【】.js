define((function () {
    return {
        a:1,
        b:function () {
            console.log(this.a);
        }
    }
})());