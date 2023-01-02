var gulp=require("gulp");
var load=require("gulp-load-plugins")();
var server=require("browser-sync").create();
gulp.task("default",function () {
    // gulp.src("./js/gulp/a.js")
    // gulp.src(["./js/gulp/a.js","./js/gulp/b.js"])
    gulp.src("./js/gulp/*.js")
        .pipe(load.uglify())
        .pipe(load.concat("main.min.js"))
        .pipe(load.rename("index.min.js"))
        .pipe(gulp.dest("./dist/"));
});
gulp.task("a",function () {
    gulp.src("./css/*.css")
        .pipe(load.minifyCss())
        .pipe(load.concat("main.min.css"))
        .pipe(gulp.dest("./dist/"));
});

/*gulp.task("a1",function () {
    console.log("aaaa");
});

gulp.task("a2",["a1"],function () {
    console.log("bbb");
});*/

gulp.task("a1",function (done) {
    console.log("aaaa");
    //如果同步写入时,需要一定执行时间,我们可以侦听end事件,触发done完成当前任务流
    // .on("end",done);
    done();
});
gulp.task("a2",gulp.series("a1",function () {
        console.log("bbbb");
}));
gulp.task("a3",function () {
    gulp.watch("./js/gulp/*.js",function (event) {
        gulp.src("./js/gulp/*.js")
            .pipe(load.uglify())
            .pipe(load.concat("main.min.js"))
            .pipe(load.rename("index.min.js"))
            .pipe(gulp.dest("./dist/"));
    })
});
gulp.task("a5",function (done) {
    server.reload();
});
gulp.task("a4",function () {
    server.init({
        server:"./",
        port:3002
    });
    gulp.watch("./**/*.*",gulp.series("a5"))
});

