<?php
session_start();
include('database_connection.php'); // Include your database connection file

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Query to check user credentials in the employee table
    $query = "SELECT role, password FROM employees WHERE email = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($role, $hashed_password);
        $stmt->fetch();

        // Verify the password
        if (password_verify($password, $hashed_password)) {
            echo "Login successful. Role: " . $role; // Return success message with role
        } else {
            echo "Invalid email or password."; // Return error message
        }
    } else {
        echo "Invalid email or password."; // Return error message
    }
    $stmt->close();
}
?>
