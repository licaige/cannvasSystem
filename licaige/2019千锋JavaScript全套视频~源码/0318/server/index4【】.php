<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/3/18 0018
 * Time: 下午 15:25
 */
header("content-type:text/html;charset=utf-8");
//$a=1.4;
//$a=10;
//var_dump($a);
//$a=false;
//var_dump($a);
$arr=array(1,2,3,4);
//print_r($arr);
//echo count($arr);//获取数组长度
//for($i=0;$i<count($arr);$i++){
//    echo $arr[$i];
//}
$arr1=array("id"=>1001,"name"=>"iphone手机","price"=>3699);
//echo count($arr1);
//关联性数组遍历
foreach ($arr1 as $key=>$item){
    echo $key,"&nbsp;",$item;
    echo "<br>";
}
//普通数组遍历
foreach ($arr as $value){
    echo $value;
    echo "<br>";
}
//json_encode(数组)转换为字符串
//json_decode(json字符串)转换成数组
//echo json_encode($arr1);

/*class Box{
    //函数名和类名相同，因此这个函数就是构造函数
    var $w=0;
    function Box($_w=10){
//        php是箭头语法，不使用.使用->
        $this->w=$_w;
    }
    function play(){
        echo $this->w;
    }
}
$box1=new Box(20);
$box1->play();*/