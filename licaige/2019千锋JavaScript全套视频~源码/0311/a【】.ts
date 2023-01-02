class Box{
    private r:Number=6;

    constructor(_r:Number){
        let r:Number=_r;
        this.r=_r;
        this.play();
    }
    play():Boolean
    {
        return true;
    }
}
