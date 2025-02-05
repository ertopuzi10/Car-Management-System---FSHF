<?php
$servername = "localhost"; // Change if necessary
$username = 'root'; //replace with your database username
$password = ""; // Replace with your database password
$dbname = "car_management"; //your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch pending requests
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

    // Update the car status in the database
    $sql = "UPDATE cars SET isAvailable = ? WHERE plate = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("is", $status, $plate);
    $stmt->execute();
    $stmt->close();
}

// Return the requests as JSON
header('Content-Type: application/json');
echo json_encode($requests);


$conn->close();
?>
