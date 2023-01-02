var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Box = (function () {
    //任何变量都需要使用:类型强制指出该类型
    function Box() {
        //私有属性,继承后不可使用,对象不可以调用
        this.num = 10;
        //私有的属性,可以被继承,对象不可调用
        this.nums = "20";
        //共有,可以被继承,对象可以调用
        this.num1 = true;
    }
    Box.prototype.play = function () {
        console.log(this.num);
    };
    //继承子类中将不具备这个方法
    Box.prototype.getSum = function () {
        return 5;
    };
    Box.prototype.getSums = function () {
        return { a: 1, b: 2 };
    };
    Box.prototype.getAge = function () {
        return 10;
    };
    Box.prototype.getSex = function () {
        return "man";
    };
    return Box;
}());
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        return _super.call(this) || this;
    }
    Ball.prototype.play = function () {
        // this.nums=30;
    };
    Ball.prototype.getSums = function () {
        return { a: 1, b: 2 };
    };
    Ball.prototype.getAge = function () {
        return 20;
    };
    Ball.prototype.getSex = function () {
        return "women";
    };
    return Ball;
}(Box));
