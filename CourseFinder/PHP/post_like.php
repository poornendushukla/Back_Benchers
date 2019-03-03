<?php
require "init.php";
$like = $_POST['like'];
$course_id = $_POST['course_id'];
$user_id = $_POST['user_id'];
if($like == 'like'){
    $sql = "INSERT INTO like_table values('$course_id', '$user_id')";
    $result = mysqli_query($con, $sql);
    if($result){
        $s = "UPDATE `TABLE 4` SET votes=votes+1 WHERE id = '$course_id'";
        mysqli_query($con, $s);
        echo "liked";
    }else{
        echo "failed";
    }
} else if($like == 'dislike'){
    $sql = "DELETE like_table WHERE course_id = '$course_id' and user_id = '$user_id')";
    $result = mysqli_query($con, $sql);
    if($result){
        $s = "UPDATE `TABLE 4` SET votes=votes-1 WHERE id = '$course_id'";
        mysqli_query($con, $s);
        echo "disliked";
    }else{
        echo "failed";
    }
}
?>