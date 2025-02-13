<?php

//kredencialet e DB ne mysql
$servername = "localhost";
$username = "root"; 
$password = ""; 
$database = "car_management"; 

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$input = json_decode(file_get_contents("php://input"), true);
$car_plate = $input['car_plate'];
$driver_name = $input['driver_name'];
$start_date = $input['start_date'];
$return_date = $input['return_date'];
$destination = $input['destination'];



$sql = "INSERT INTO assigned_cars (car_plate, driver_name, start_date, return_date, destination) VALUES (?, ?, ?, ?, ?)";
error_log("SQL: " . $sql); // SQL debugging

error_log("SQL: " . $sql); // SQL debugging

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $car_plate, $driver_name, $start_date, $return_date, $destination);

if ($stmt->execute()) {
    error_log("Car assigned successfully."); 

    error_log("Car assigned successfully."); 

    echo "Car assigned successfully.";
} else {
    error_log("Error: " . $stmt->error); 
    echo "Error: " . $stmt->error;


}

$stmt->close();
$conn->close();
?>
