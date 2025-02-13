<?php
session_start();
if (isset($_SESSION['user_id'])) {
    if ($_SESSION['role'] === 'admin') {
        header("Location: ../admin/adminPanel.php");
    } elseif ($_SESSION['role'] === 'driver') {
        header("Location: ../driver/driverPanel.php");
    } elseif ($_SESSION['role'] === 'departments_employee') {
        header("Location: ../requestForm/index.php");
    }

    exit();
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
            <h2>Logohu ne sistem.</h2>
            <div class="inputBox">
                <input type="email" name="email" id="email" placeholder="Email" required>
                <i class='bx bxs-user'></i>
            </div>
            <div class="inputBox">
                <input type="password" name="password" id="password" placeholder="Password" required>
                <i class='bx bxs-lock-alt' id="togglePassword" style="cursor: pointer;"></i>
            </div>
            <div class="remember-forgot">
                <label><input type="checkbox">Ruaj te dhenat.</label>
                <a href="#">Harrove fjalekalimin?</a>
            </div>
            <button type="submit" class="btn">Login</button>
        </form>
    </div>

    <!-- <script src="sign_log.js"></script> -->
    <script src="sign_log.js?v=<?php echo time(); ?>"></script>

</body>
</html>
