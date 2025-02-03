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

// Debugging output for received POST data
echo "Received POST data:\n";
print_r($_POST);

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO car_requests (first_name, last_name, date_needed, return_date, destination, event_description) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $first_name, $last_name, $date_needed, $return_date, $destination, $event_description);

// Set parameters
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$date_needed = $_POST['date_get'];
$return_date = $_POST['date_turn'];
$destination = $_POST['destination'];
$event_description = $_POST['event_description'];

// Debugging output
echo "Inserting values: $first_name, $last_name, $date_needed, $return_date, $destination, $event_description\n";

if ($stmt->execute()) {
    echo "New request submitted successfully";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
