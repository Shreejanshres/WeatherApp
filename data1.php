<?php
    include("connection.php");
    $ApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Kathmandu&appid=9655cc0b7f1f78ea68cac5236d885963&units=metric";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $ApiUrl);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_VERBOSE, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $response = curl_exec($ch);
    curl_close($ch);
    $data = json_decode($response);
    $currentTime = date("Y-m-d H:i:s");
    $temp = $data->main->temp;
    $location = $data->name;
    $info=$data->weather[0]->main;
    $icon=$data->weather[0]->icon;
    $wind=$data->wind->speed;
    $humidity=$data->main->humidity;
    $pressure=$data->main->pressure;
    $deg=$data->wind->deg;
    $sunrise=$data->sys->sunrise;	
    $sunset=$data->sys->sunset;
    
	

    $sql_for_data_getter= mysqli_query($conn,"SELECT * FROM weatherdata WHERE currenttime >=DATE_SUB(NOW(),INTERVAL 1 HOUR");
    


	$sql_for_data_getter=mysqli_query($conn,"INSERT INTO weatherdata(location,temperature,humidity,weatherdesc,wind,winddeg,pressure,sunrise,sunset,currenttime,icon) 
	VALUES('$location','$temp','$humidity','$info','$wind','$deg','$pressure','$sunrise','$sunset','$currentTime','$icon')");


    

?>

