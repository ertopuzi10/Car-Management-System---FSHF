<?php
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'driver') {
    header("Location: ../regist/sign_log.php");
    exit();
}
?>

<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Driver Panel</title>
    <link rel="stylesheet" href="driverPanel.css">
</head>
<body>

    <h2>Driver Panel</h2>

    <div style="position: absolute; top: 10px; left: 10px;">
        <div class="menu" onclick="toggleMenu()">☰</div>
        <button class="logout-button" onclick="removeSession()">LogOut</button>
    </div>
    
    <div id="notifications" class="notification" style="display: none;">
        You have a new assignment!
    </div>

    <h3>Your Assigned Cars</h3>
    <table id="assigned-cars-table">
        <thead>
            <tr>
                <th>Car Plate</th>
                <th>User</th>
                <th>Date Needed</th>
                <th>Return Date</th>
                <th>Destination</th>
            </tr>
        </thead>
        <tbody>
            <!-- Assigned cars will be dynamically inserted here -->
        </tbody>
    </table>
    <!-- Driver panel content goes here -->

    <script src="driverPanel.js"></script>

</body>
</html>
