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

    <h2>Nderfaqja e shofereve.</h2>

    <div style="position: absolute; top: 10px; left: 10px;">
        <div class="menu" onclick="toggleMenu()">☰</div>
        <button class="logout-button" onclick="removeSession()">LogOut</button>
    </div>
    
    <div id="notifications" class="notification" style="display: none;">
        Nje detyre e re eshte caktuar!
    </div>

    <h3>Makinat e caktuara</h3>
    <table id="assigned-cars-table">
        <thead>
            <tr>
                <th>Targa e makines</th>
                <th>Personi qe do transportohet </th>
                <th>Data e nisjes</th>
                <th>Data e kthimit</th>
                <th>Destinacioni</th>
            </tr>
        </thead>
        <tbody>
            <!-- makinat e selektuara -->
        </tbody>
    </table>

    <script src="driverPanel.js"></script>


</body>
</html>
