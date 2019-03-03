<?php
require "init.php";
$user_name = $_POST['user_name'];
$course_id = $_POST['course_id'];
$review = $_POST['review'];

$sql = "INSERT INTO reviews VALUES('$user_name', '$course_id', '$review')";

$res = mysqli_query($con, $sql);

if($res){
    echo "posted";
}else{
    echo "failed";
}


?>