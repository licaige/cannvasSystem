<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/3/18 0018
 * Time: 下午 17:09
 */
header("content-type:text/html;charset=utf-8");
openDataBase();
function openDataBase(){
//    $user=$_REQUEST["user"];
//    $pass=$_REQUEST["pass"];
//    $age=$_REQUEST["age"];
//    $sex=$_REQUEST["sex"];
//    $tel=$_REQUEST["tel"];
//    $email=$_REQUEST["email"];
    $sql=mysqli_connect("localhost","root","root","game","3306");
    if(mysqli_connect_error()){
       return;
    }
//    $a=20;
//    echo "aaa".$a."bbb";
//    $bool=mysqli_query($sql,"INSERT INTO `user`(`name`, `password`, `age`, `sex`, `tel`, `email`) VALUES ('$user','$pass',$age,'$sex','$tel','$email')");
//    echo $bool;
}