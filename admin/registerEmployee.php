<?php

require_once('../DB-conn/database_connection.php');

// marrja e te dhenave
$name = $_POST['name'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // enkriptimi passwordit ne kod hash
$role = $_POST['role'];

$stmt = $conn->prepare("INSERT INTO employees (name, email, password, role) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $password, $role);


if ($stmt->execute()) {
    echo "New employee registered successfully.";
    // lidhemi me nderfaqen ne baze te roleve
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

// mbyllim lidhjet
$stmt->close();
$conn->close();
?>
