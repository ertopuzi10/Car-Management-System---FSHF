const cars = [
    { plate: "ABC123", driver: "John Doe", isAvailable: true },
    { plate: "XYZ456", driver: "Jane Smith", isAvailable: true },
    { plate: "LMN789", driver: "Alice Johnson", isAvailable: false }
]; // Keep default cars for local operations

function populateCarsTable() {
    const carsTableBody = document.getElementById("cars-table").querySelector("tbody");
    carsTableBody.innerHTML = ""; // Clear existing rows
    cars.forEach(car => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${car.plate}</td>
            <td>${car.driver}</td>
            <td>
                <select class="status-dropdown" onchange="updateCarStatus('${car.plate}', this.value)">
                    <option value="available" ${car.isAvailable ? 'selected' : ''}>Available</option>
                    <option value="unavailable" ${!car.isAvailable ? 'selected' : ''}>Unavailable</option>
                    <option value="in_service">In Service</option>
                </select>
            </td>
        `;
        carsTableBody.appendChild(row);
    });
}

// Update Car Status Functionality
function updateCarStatus(plate, status) {
    const car = cars.find(car => car.plate === plate);
    if (car) {
        car.isAvailable = (status === "available");
        // Optionally, send the updated status to the server
        fetch('fetch_requests.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ plate: plate, status: car.isAvailable }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Car status updated:', data);
        })
        .catch((error) => {
            console.error('Error updating car status:', error);
        });
    }
}

// Assign Car Functionality
function assignCar(requestId, user, dateNeeded, returnDate, destination) {
    const selectElement = document.getElementById(`car-select-${requestId}`);
    const selectedCarPlate = selectElement.value;

    // Check if the selected car is in the availableCars array
    const car = availableCars.find(car => car.car_plate === selectedCarPlate);
    if (car && car.status === 'available') {
        car.status = 'unavailable'; // Change car status to unavailable
        populateCarsTable(); // Refresh the cars table

        // Store assigned car information in localStorage
        const assignedCar = {
            plate: selectedCarPlate,
            user: user,
            dateNeeded: dateNeeded,
            returnDate: returnDate,
            destination: destination
        };
        window.localStorage.setItem("driverNotification", JSON.stringify(assignedCar));

        alert(`Car ${selectedCarPlate} assigned successfully!`);
    } else {
        alert("Selected car is not available.");
    }
}

// Add Car Functionality
document.getElementById("add-car-button").addEventListener("click", () => {
    const carPlate = document.getElementById("car-plate").value;
    const driverName = document.getElementById("driver-name").value;
    const isAvailable = document.getElementById("availability").value === "true";

    // Create new car object
    const newCar = {
        plate: carPlate,
        driver: driverName,
        isAvailable: isAvailable
    };

    // Add the new car to the cars array
    cars.push(newCar);

    // Send the new car data to the server
    fetch('add_car.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCar),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Car added:', data);
        // Update the cars table
        // populateCarsTable();
        // Clear the form
        document.getElementById("add-car-form").reset();
        alert("Car added successfully!");
    })
    .catch((error) => {
        console.error('Error adding car:', error);
    });
});

// Initial population of cars table
// populateCarsTable();
