<!-- <?php
session_start();
if (isset($_SESSION['user_id'])) {
    header("Location: panel.php"); // Redirect logged-in users
    exit();
}
?> -->

<?php
session_start();

// Check if user is already logged in
if (isset($_SESSION['user_id']) && isset($_SESSION['role'])) {
    $role = $_SESSION['role'];

    // Redirect based on role
    if ($role === 'admin') {
        header("Location: ../admin/adminPanel.php");
        exit();
    } elseif ($role === 'driver') {
        header("Location: ../driver/driverPanel.php");
        exit();
    } elseif ($role === 'departments_employee') {
        header("Location: ../requestForm/index.php");
        exit();
    }
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Input form.</title>
    <link rel="stylesheet" href="sign_log.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
    <div class="signin">
        <form id="signInForm">
            <h2>Sign In</h2>
            <div class="inputBox">
                <input type="email" name="email" id="email" placeholder="Email" required>
                <i class='bx bxs-user'></i>
            </div>
            <div class="inputBox">
                <input type="password" name="password" id="password" placeholder="Password" required>
                <i class='bx bxs-lock-alt'></i>
            </div>
            <div class="remember-forgot">
                <label><input type="checkbox">Remember me</label>
                <a href="#">Forgot password?</a>
            </div>
            <button type="submit" class="btn">Login</button>
            <!-- <div class="register">
                <p>Don't have an account? <a href="#">Register now!</a></p>
            </div>  -->
        </form>
    </div>
    <script src="sign_log.js"></script>
</body>
</html>
