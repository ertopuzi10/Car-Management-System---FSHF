<?php
// Database connection
include('database_connection.php');

// Get the data from the request
$data = json_decode(file_get_contents("php://input"));
$plate = $data->plate;
$status = $data->status;

// Update car status in the database
$query = "UPDATE cars SET status = '$status' WHERE plate = '$plate'";
$result = mysqli_query($conn, $query);

if ($result) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => mysqli_error($conn)]);
}
?>
