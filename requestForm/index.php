<?php
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'departments_employee') {
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
    <title>Car Request Form</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>

<div style="position: absolute; top: 10px; left: 10px;">
    <div class="menu" onclick="toggleMenu()">☰</div>
    <button class="logout-button" onclick="removeSession()">LogOut</button>
</div>

<h2 style="text-align: center;">Bej kerkese per te perdorur makinat e federates.</h2>

<form action="submit_request.php" method="POST">

    <!-- input- field per emrin -->
    <label for="first-name">Emri:</label>
    <input type="text" id="first-name" name="first_name" placeholder="Enter your first name" required>

    <!-- input - field per mbiemrin -->
    <label for="last-name">Mbiemri:</label>
    <input type="text" id="last-name" name="last_name" placeholder="Enter your last name" required>

    <!-- format per oren -->
    <label for="time_format">Formati i kohës:</label>
    <select id="time_format" name="time_format" required>
        <option value="hours">Orë</option>
        <option value="days">Ditë</option>
    </select>

    <!-- format per ditet -->
    <label for="date_get">Koha qe ju nevojitet makina:</label>
    <input type="date" id="date_get" name="date_get" required>
    <input type="time" id="time_get" name="time_get" style="display:none;">

    <label for="date_turn">Koha e mundshme e kthimit:</label>
    <input type="date" id="date_turn" name="date_turn" required>
    <input type="time" id="time_turn" name="time_turn" style="display:none;">

    <!-- input - field per destinacionin -->
    <label for="destination">Destinacioni ku keni per te shkuar:</label>
    <input type="text" id="destination" name="destination" placeholder="Enter the destination" required>

    <!-- input - field per pershkrimin e eventit -->
    <label for="event-description">Eventi qe do te merrni pjese:</label>
    <textarea id="event-description" name="event_description" placeholder="Provide details about the event" rows="4" required></textarea>

    <!-- Submit Button -->
    <button type="submit">Dergo Kerkesen</button>
</form>


<script src="index.js"></script>

</body>
</html>
