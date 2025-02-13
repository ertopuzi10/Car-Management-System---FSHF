<?php
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
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
    <title>Admin Panel</title>
    <link rel="stylesheet" href="adminPanel.css">
</head>
<body>

    <h2>Nderfaqja e administratorit.</h2>

    <div style="position: absolute; top: 10px; left: 10px;">
        <div class="menu" onclick="toggleMenu()">☰</div>
        <button class="logout-button" onclick="removeSession()">LogOut</button>
    </div>

    <div class="regist_employee">
        <a href="registrationForm.html" target="_blank">Regjistro nje punonjes te ri ne sistem.</a>
    </div>

    <!-- From - section i cili shton nje makine te re -->
    <div class="form-section">
        <h3>Shto nje makine te re.</h3>
        <form id="add-car-form">
            <label for="car-plate">Shkruaj targen:</label>
            <input type="text" id="car-plate" name="car_plate" placeholder="Shkruaj targen e makines" required>

            <label for="driver-name">Emri i shoferit:</label>
            <input type="text" id="driver-name" name="driver_name" placeholder="Vendos emrin e shoferit perkates" required>

            <label for="availability">Disponueshmeria:</label>
            <select id="availability" name="availability" required>
                <option value="true">Po</option>
                <option value="false">Jo</option>
            </select>

            <button type="button" id="add-car-button">Shtoje makinen</button>
        </form>
    </div>

    <!-- Tabela e cila ruan kerkesat per perdorim makine -->
    <h3>Kerkesat e kryera</h3>
    <table id="pending-requests-table">
        <thead>
            <tr>
                <th>ID Kerkeses</th>
                <th>Personi kerkues</th>
                <th>Data e nevojitur</th>
                <th>Data e kthimit</th>
                <th>Destinacioni</th>
                <th>Eventi</th>
                <th>Cakto makinen</th>
            </tr>
        </thead>
        <tbody>
            <!-- <tr>
                <td>1</td>
                <td>John Doe</td>
                <td>2023-10-01</td>
                <td>2023-10-05</td>
                <td>City Center</td>
                <td><button onclick="assignCar(1, 'John Doe', '2023-10-01', '2023-10-05', 'City Center', 'ABC123')">Assign</button></td>
            </tr> -->
        </tbody>
    </table>

    <!-- Seksioni i cili shfaq makinat e disponueshme -->
    <h3>Makinat e Disponueshme</h3>
    <table id="cars-table">
        <thead>
            <tr>
                <th>Targa e makines</th>
                <th>Shoferi</th>
                <th>Statusi</th>
            </tr>
        </thead>
        <tbody>
            <!-- vendi ku shfaqen makinat e disponueshme -->
        </tbody>
    </table>

    <script src="adminPanel.js" defer></script>
    <script src="assignCar.js" defer></script>
    <script src="cars.js" defer></script>

</body>
</html>
