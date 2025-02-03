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

// Return the requests as JSON
header('Content-Type: application/json');
echo json_encode($requests);

$conn->close();
?>
