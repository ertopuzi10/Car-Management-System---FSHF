<?php
require_once('../DB-conn/database_connection.php'); // Lidhja me databazën

header("Content-Type: application/json");

// Lexo të dhënat nga kërkesa JSON
$data = json_decode(file_get_contents("php://input"), true);

// Kontrollo nëse të dhënat janë të plota
if (!isset($data['plate']) || !isset($data['status'])) {
    echo json_encode(["success" => false, "message" => "Të dhëna të paplota."]);
    exit();
}

$plate = $data['plate'];
$status = $data['status'];

// Përditëso statusin e makinës
$update_query = "UPDATE cars SET status = ? WHERE car_plate = ?";
$update_stmt = $conn->prepare($update_query);
$update_stmt->bind_param("ss", $status, $plate);

if ($update_stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Statusi i makinës u përditësua me sukses."]);
} else {
    echo json_encode(["success" => false, "message" => "Gabim gjatë përditësimit të statusit.", "error" => $conn->error]);
}
?>
