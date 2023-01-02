<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/3/18 0018
 * Time: 下午 14:18
 */
//请求头，响应头
header("content-type:text/html;charset=utf-8");//设置响应头
//echo "中文";
//echo $_GET["user"];
//echo "<br>";
//echo $_GET["pass"];


$a=10;//全局变量
$b=40;
//abc();
//abc();
//abc();
function abc(){
    echo "<br>";
    $a=20;//局部变量,当函数运行完成后清除局部变量
    $a++;
    echo $a;
//    echo $GLOBALS["b"];//一次性调用全局变量
//    global $b;//将$b指向全局遍历
//    echo $b;//如果想多次使用全局变量，在函数中需要使用global指定那些变量是全局的
    static $c=20;//当函数运行完成后不清除静态变量，定义的这句话仅在第一次执行函数时执行
//    这里的静态变量和原生js中的闭包变量相同
    $c++;
    echo "<br>";
    echo $c;
}

//echo $a;
//print_r($_SERVER);
//print_r($_REQUEST);//可以收集表单的get或者post请求，如果不确定使用的是那种请求时，使用这个可以获取
//print_r($_GET);
//print_r($_POST);

//echo __LINE__;

//echo $a,$b;//echo 返回给前端（AJAX）页面提交方式不能返回只能跳转页面，没有返回值
//print $a; //print 仅能打印一个数据,返回一个1；
//echo print $a;//101
//print echo $a;//错误

//print_r();//打印数组
//var_dump($a);//打印类型及值
//var_dump($_REQUEST);//可以打印数组，变量等类型和值