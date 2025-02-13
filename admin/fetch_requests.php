<?php

//kredencialet e DB ne mysql
$servername = "localhost"; 
$username = 'root'; 
$password = ""; 
$dbname = "car_management"; 

// Lidhja me DB
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch te gjitha te dhenat nga tabela car_requests
$sql = "SELECT * FROM car_requests";

$result = $conn->query($sql);

$requests = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $requests[] = $row;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the posted data
    $data = json_decode(file_get_contents("php://input"), true);
    $plate = $data['plate'];
    $status = $data['status'];

    // update - imi i statusit te makinave breda DB
    $sql = "UPDATE cars SET isAvailable = ? WHERE plate = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("is", $status, $plate);
    $stmt->execute();
    $stmt->close();
}

// kthimi kerkeses ne formen JSON
header('Content-Type: application/json');
echo json_encode($requests);


$conn->close();
?>
