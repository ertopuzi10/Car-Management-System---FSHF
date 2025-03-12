<?php
require_once('../DB-conn/database_connection.php'); // Lidhja me databazën

// Kontrollo lidhjen
if(isset($_GET['request_id'])) {
    $request_id = $_GET['request_id'];

    // Marrim të dhënat e kërkesës dhe të makinës së caktuar
    $sql = "SELECT cr.id, cr.first_name, cr.last_name, cr.date_needed, cr.return_date, cr.destination, cr.event_description, 
                   IFNULL(c.car_plate, 'Nuk është caktuar') AS car_plate
            FROM car_requests cr
            LEFT JOIN cars c ON cr.car_id = c.id
            WHERE cr.id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $request_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_assoc();

    if(!$data) {
        die("Gabim: Kërkesa nuk u gjet.");
    }
} else {
    die("Gabim: ID e kërkesës mungon.");
}
?>

<!DOCTYPE html>
<html lang="sq">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Raporti i Caktimit të Makinës</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin: 20px;
        }
        .report-container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        }
        .report-title {
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .report-content {
            text-align: left;
            font-size: 18px;
        }
        .print-button {
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
        }
        .print-button:hover {
            background-color: #0056b3;
        }
        @media print {
            .print-button {
                display: none;
            }
        }
    </style>
</head>
<body>

    <div class="report-container">
        <div class="report-title">Raporti i Caktimit të Makinës</div>
        <div class="report-content">
            <p><strong>ID e Kërkesës:</strong> <?= $data['id'] ?></p>
            <p><strong>Punonjësi:</strong> <?= $data['first_name'] . ' ' . $data['last_name'] ?></p>
            <p><strong>Data e Kërkesës:</strong> <?= $data['date_needed'] ?></p>
            <p><strong>Data e Kthimit:</strong> <?= $data['return_date'] ?></p>
            <p><strong>Destinacioni:</strong> <?= $data['destination'] ?></p>
            <p><strong>Përshkrimi i Eventit:</strong> <?= $data['event_description'] ?></p>
            <p><strong>Targa e Makinës:</strong> <?= $data['car_plate'] ?></p>
        </div>
        <button class="print-button" onclick="window.print();">Printo Raportin</button>
    </div>

</body>
</html>