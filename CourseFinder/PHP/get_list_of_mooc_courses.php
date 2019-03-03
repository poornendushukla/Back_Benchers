<?php
require "init.php";
$filter_name = $_POST['filter'];
$lang = $_POST['language'];
mysqli_set_charset( $con, 'utf8');
    $sql = "SELECT * FROM `TABLE 4` WHERE language LIKE '%$lang%' ORDER BY $filter_name DESC LIMIT 100";
    $result = mysqli_query($con, $sql);
    $response = array();
    while($row = mysqli_fetch_assoc($result)){
        array_push($response, array("name"=>$row["title"], "upvotes"=>$row["votes"], "author"=>$row["author"], "course_id"=>$row["id"], "tagslist"=>$row["tags"], "link"=>$row["link_url"], "desc"=>$row["description"]));
    }
    
    echo json_encode(array("server_response"=>$response));
?>