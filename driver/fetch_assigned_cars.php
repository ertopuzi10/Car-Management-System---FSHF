<?php

require_once('../DB-conn/database_connection.php'); // Lidhja me databazën

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT car_plate, driver_name, start_date, return_date, destination FROM assigned_cars";
$result = $conn->query($sql);

$cars = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $cars[] = $row;
    }
}

echo json_encode($cars);

$conn->close();
?>
