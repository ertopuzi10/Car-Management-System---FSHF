<?php

// kredencialet e DB ne mysql
$servername = "localhost";
$username = 'root';
$password = ""; 
$dbname = "car_management"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// data - print per debugging
echo "Received POST data:\n";
print_r($_POST);

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO car_requests (first_name, last_name, date_needed, return_date, destination, event_description) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $first_name, $last_name, $date_needed, $return_date, $destination, $event_description);

$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$date_needed = $_POST['date_get'];
$return_date = $_POST['date_turn'];
$destination = $_POST['destination'];
$event_description = $_POST['event_description'];

// kontroll per request me dite ose dite + ore
if ($_POST['time_format'] === 'hours') {
    if (empty($_POST['time_get']) || empty($_POST['time_turn'])) {
        die("Error: Time inputs are required when selecting hours.");
    } else {
        $date_needed .= ' ' . $_POST['time_get']; 
        $return_date .= ' ' . $_POST['time_turn'];
    }
} else {
    // shfaqja vetem ne formatin e diteve
    $date_needed = $_POST['date_get'];
    $return_date = $_POST['date_turn'];
}

// print data per debugging
echo "Inserting values: $first_name, $last_name, $date_needed, $return_date, $destination, $event_description\n";

if ($stmt->execute()) {
    echo "New request submitted successfully";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>

