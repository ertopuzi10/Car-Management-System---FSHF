function assignCar(requestId, driverName, startDate, returnDate, destination, carPlate) {
    const data = {
        car_plate: carPlate,
        driver_name: driverName,
        start_date: startDate,
        return_date: returnDate,
        destination: destination
    };

    fetch('assign_car.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })

    .then(result => {
        console.log('Assignment result:', result);
        alert('Car assigned successfully!'); 
    })
    .catch(error => console.error('Error assigning car:', error));
}
