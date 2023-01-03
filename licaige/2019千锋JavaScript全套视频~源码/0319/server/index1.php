<html>
<head>
    <style>
        table
        {
            border-collapse: collapse;
        }
        td
        {
            border:1px solid #000000;
        }
    </style>
</head>
<body>
<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/3/19 0019
 * Time: 上午 9:17
 */
header("content-type:text/html;charset=utf-8");
openSQL();
function openSQL(){
    $sql=mysqli_connect("localhost","root","root","game","3306");
    if(mysqli_connect_error()){
        return;
    }
//   $list=mysqli_query($sql,"SELECT * FROM `user` WHERE 1");
//   $list=mysqli_query($sql,"SELECT `name`,`age`,`gender` FROM `user` WHERE 1");
//   $list=mysqli_query($sql,"SELECT * FROM `user` WHERE age>20");
//   $list=mysqli_query($sql,"SELECT * FROM `user` WHERE age=20");
//    模糊查找
   $list=mysqli_query($sql,"SELECT * FROM `user` WHERE name LIKE '%三'");
    if($list->num_rows<1) return;
    echo "<table>";
    for($i=0;$i<$list->num_rows;$i++){
        $obj=mysqli_fetch_array($list);
        echo "<tr>";
        foreach ($obj as $key=>$value){
            if(is_int($key))continue;
            echo "<td>";
            echo $value."&nbsp;&nbsp;";
            echo "</td>";
        }
        echo "</tr>";
    }
    echo "</table>";
}
?>
</body>
</html>