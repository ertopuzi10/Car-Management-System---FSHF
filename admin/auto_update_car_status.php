<?php
require_once('../DB-conn/database_connection.php'); // Lidhja me databazën

// Merr të gjitha makinat që kanë kaluar datën e kthimit
$sql = "SELECT cr.car_id, c.car_plate FROM car_requests cr 
        JOIN cars c ON cr.car_id = c.id
        WHERE cr.return_date <= NOW() AND c.status = 'unavailable'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $car_id = $row['car_id'];
        $car_plate = $row['car_plate'];

        // Përditëso statusin e makinës në "available"
        $update_sql = "UPDATE cars SET status = 'available' WHERE id = ?";
        $stmt = $conn->prepare($update_sql);
        $stmt->bind_param("i", $car_id);

        if ($stmt->execute()) {
            echo "Makina me targe " . $car_plate . " tani është e disponueshme.\n";
        } else {
            echo "Gabim në përditësimin e statusit për " . $car_plate . "\n";
        }
    }
} else {
    echo "Nuk ka makina për t'u bërë 'available'.\n";
}

?>
