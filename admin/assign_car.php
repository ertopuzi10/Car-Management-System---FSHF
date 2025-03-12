<?php
require_once('../DB-conn/database_connection.php'); // Lidhja me databazën
header("Content-Type: application/json");

// Marrim të dhënat nga kërkesa
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['request_id']) || !isset($data['car_plate'])) {
    echo json_encode(["success" => false, "message" => "Të dhëna të paplota."]);
    exit();
}

$request_id = $data['request_id'];
$car_plate = $data['car_plate'];

// Marrim ID e makinës nga tabela `cars`
$sql = "SELECT id FROM cars WHERE car_plate = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $car_plate);
$stmt->execute();
$result = $stmt->get_result();
$car = $result->fetch_assoc();

if (!$car) {
    echo json_encode(["success" => false, "message" => "Makinë e papërcaktuar."]);
    exit();
}

$car_id = $car['id'];

// Përditësojmë `car_id` në `car_requests`
$update_request = "UPDATE car_requests SET car_id = ? WHERE id = ?";
$update_stmt = $conn->prepare($update_request);
$update_stmt->bind_param("ii", $car_id, $request_id);
$update_stmt->execute();

// Përditësojmë statusin e makinës në `cars` në "unavailable"
$update_car_status = "UPDATE cars SET status = 'unavailable' WHERE id = ?";
$update_stmt = $conn->prepare($update_car_status);
$update_stmt->bind_param("i", $car_id);

if ($update_stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Makinë e caktuar me sukses."]);
} else {
    echo json_encode(["success" => false, "message" => "Gabim gjatë përditësimit të statusit."]);
}
?>
