<?php
session_start();

//lidhja me DB nepermjet nje flete te jashtme
include('database_connection.php'); 

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // query -- kredencialet e perdoruesit
    $query = "SELECT role, password FROM employees WHERE email = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($role, $hashed_password);
        $stmt->fetch();

        // verifikimi password - it
        if (password_verify($password, $hashed_password)) {
            $_SESSION['loggedin'] = true;
            $_SESSION['role'] = $role;
            echo "Login successful. Role: " . $role; 
        } else {
            echo "Invalid email or password.";
        }
    } else {
        echo "Invalid email or password.";
    }
    $stmt->close();
}
?>
