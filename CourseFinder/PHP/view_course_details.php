<?php
    require "init.php";
    $id = $_POST['course_id'];
    mysqli_set_charset( $con, 'utf8');
    $sql = "SELECT * FROM `TABLE 4` WHERE id = $id";
    $result = mysqli_query($con,$sql);
    $row = mysqli_fetch_assoc($result);
    $response = array();
    array_push($response, array("name"=>$row["title"], "upvotes"=>$row["votes"], "author"=>$row["author"], "link"=>$row["link_url"], "institute"=>$row["institute"], "rating"=>$row['rating'], "balanced"=>$row['balanced_rating'], "desc"=>$row['description']));
    echo json_encode(array("response"=>$response));
?>