<?php

require_once('../DB-conn/database_connection.php'); // Lidhja me databazën

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
