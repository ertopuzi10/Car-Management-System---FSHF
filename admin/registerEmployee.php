<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = ""; // Update if you have a password
$dbname = "car_management";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password
$role = $_POST['role'];

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO employees (name, email, password, role) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $password, $role);

// Execute the statement
if ($stmt->execute()) {
    echo "New employee registered successfully.";
    // Redirect based on role
    switch ($role) {
        case 'driver':
            header("Location: ../driver/driverPanel.html");
            break;
        case 'departments_employee':
            header("Location: ../requestForm/index.html");
            break;
        case 'admin':
            header("Location: ../admin/adminPanel.html");
        break;
        default:
            header("Location: ../admin/adminPanel.html");
            break;
    }
} else {
    echo "Error: " . $stmt->error;
}

// Close connections
$stmt->close();
$conn->close();
?>
