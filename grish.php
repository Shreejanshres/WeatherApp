<?php
    header("Access-Control-Allow-Origin: *");
    include('data1.php');

    $mysqliobject=mysqli_query($conn,"SELECT * FROM weatherdata ORDER BY currenttime DESC limit 1");

    echo json_encode($mysqliobject->fetch_assoc());

?>


