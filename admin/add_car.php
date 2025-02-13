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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // marrja e te dhenave me metoden POST
    $data = json_decode(file_get_contents("php://input"), true);
    
    $car_plate = $data['plate'];
    $driver_name = $data['driver'];
    $status = $data['isAvailable'] ? 'available' : 'not available';

    $sql = "INSERT INTO cars (car_plate, driver_name, status) VALUES ('$car_plate', '$driver_name', '$status')";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Car added successfully"]);
    } else {
        echo json_encode(["error" => $conn->error]);
    }
}

$conn->close();
?>
