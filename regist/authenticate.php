<?php
session_start();
error_reporting(E_ALL); // report per gabime te mundshme
ini_set('display_errors', 1); 

require_once('../DB-conn/database_connection.php'); // lidhja me DB

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $query = "SELECT id, role, password FROM employees WHERE email = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $role, $hashed_password);
        $stmt->fetch();


        if (password_verify($password, $hashed_password)) {
            $_SESSION['user_id'] = $id;
            $_SESSION['role'] = $role;

            error_log("User ID: " . $_SESSION['user_id']);
            error_log("User Role: " . $_SESSION['role']);
            error_log("User ID: " . $_SESSION['user_id']);
            error_log("User Role: " . $_SESSION['role']);



            if ($role === 'admin') {
            echo json_encode(["status" => "success", "role" => $role]);

            } elseif ($role === 'driver') {
            echo json_encode(["status" => "success", "role" => $role]);

            } elseif ($role === 'departments_employee') {
            echo json_encode(["status" => "success", "role" => $role]);

            }
            exit();

        } else {
            echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
    }
    
    $stmt->close();
}
$conn->close();
?>
