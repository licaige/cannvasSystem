class Box implements IPlayer{
    //私有属性,继承后不可使用,对象不可以调用
    private  num:Number=10;
    //私有的属性,可以被继承,对象不可调用
    protected nums:String="20";
    //共有,可以被继承,对象可以调用
    public num1:Boolean=true;
    //任何变量都需要使用:类型强制指出该类型
    constructor(){

    }
   public play():void{
        console.log(this.num);
    }
    //继承子类中将不具备这个方法
    private getSum():Number{
        return 5;
    }

    protected getSums():Object{
        return {a:1,b:2};
    }

    getAge():Number{
        return 10;
    }
    getSex():String{
        return "man"
    }
}
class Ball extends Box implements IPlayer{
    constructor(){
        super();
    }
    public play(){
        // this.nums=30;
    }

    protected getSums(){
        return {a:1,b:2};
    }

    getAge():Number{
        return 20;
    }
    getSex():String{
        return "women"
    }
}

interface IPlayer{
    getAge():Number;
    getSex():String;
}