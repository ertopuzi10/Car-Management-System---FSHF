const cars = [
    { plate: "ABC123", driver: "John Doe", isAvailable: true },
    { plate: "XYZ456", driver: "Jane Smith", isAvailable: true },
    { plate: "LMN789", driver: "Alice Johnson", isAvailable: false }
]; // Keep default cars for local operations

function populateCarsTable() {
    const carsTableBody = document.getElementById("cars-table").querySelector("tbody");
    carsTableBody.innerHTML = ""; 
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

// Update statusi i makines
function updateCarStatus(plate, status) {
    const car = cars.find(car => car.plate === plate);
    if (car) {
        car.isAvailable = (status === "available");
        // kalimi i statusit te updatur ne server
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

function assignCar(requestId, user, dateNeeded, returnDate, destination) {
    const selectElement = document.getElementById(`car-select-${requestId}`);
    const selectedCarPlate = selectElement.value;

    // kontrollo nqs makina e selektuar eshte ne listen availableCars
    const car = availableCars.find(car => car.car_plate === selectedCarPlate);
    if (car && car.status === 'available') {
        car.status = 'unavailable'; 
        populateCarsTable(); 

        // Ruajme makinat e selektuara ne memorie lokale
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

// Funksioni i cili shton nje makine
document.getElementById("add-car-button").addEventListener("click", () => {
    const carPlate = document.getElementById("car-plate").value;
    const driverName = document.getElementById("driver-name").value;
    const isAvailable = document.getElementById("availability").value === "true";

    // krijojme objektin e ri
    const newCar = {
        plate: carPlate,
        driver: driverName,
        isAvailable: isAvailable
    };

    cars.push(newCar);

    // te dhenat e makines se re ne server
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
        populateCarsTable();
        document.getElementById("add-car-form").reset();
        alert("Car added successfully!");
    })
    .catch((error) => {
        console.error('Error adding car:', error);
    });
});

// Initial population of cars table
// populateCarsTable();