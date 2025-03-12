<?php
// flete e jashtme e cila mundeson lidhjen e file - ve te tjera me DB
$servername = "localhost";
$username = 'root';
$password = "";
$dbname = "car_management";

// krijimi lidhjes
$conn = new mysqli($servername, $username, $password, $dbname);

// kontrolli i lidhjes
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
