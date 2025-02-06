const cars = [
    { plate: "ABC123", driver: "John Doe", isAvailable: true },
    { plate: "XYZ456", driver: "Jane Smith", isAvailable: true },
    { plate: "LMN789", driver: "Alice Johnson", isAvailable: false }
]; // Initialize with default cars

// Fetch pending requests from the backend
fetch('fetch_requests.php') // Updated to reflect new location
    .then(response => response.json())
    .then(data => {
        const requestsTableBody = document.getElementById("pending-requests-table").querySelector("tbody");
        data.forEach(request => {
            const row = document.createElement("tr");
            row.setAttribute("data-return-time", request.return_date); // Store return time in a data attribute
            row.innerHTML = `
                <td>${request.id}</td>
                <td>${request.first_name} ${request.last_name}</td>
                <td>${request.date_needed}</td>
                <td>${request.return_date}</td>
                <td>${request.destination}</td>
                <td>${request.event_description}</td>
                <td>
                    <select id="car-select-${request.id}">
                        ${cars.filter(car => car.isAvailable).map(car => `<option value="${car.plate}">${car.plate}</option>`).join('')}
                    </select>
                    <button onclick="assignCar('${request.id}', '${request.first_name} ${request.last_name}', '${request.date_needed}', '${request.return_date}', '${request.destination}')">Assign</button>
                </td>
            `;
            requestsTableBody.appendChild(row);
        });
        monitorReturnTimes(); // Start monitoring return times
    })
    .catch(error => console.error('Error fetching pending requests:', error));

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
    const car = cars.find(car => car.plate === selectedCarPlate);
    if (car && car.isAvailable) {
        car.isAvailable = false; // Change car status to unavailable
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

// Monitor Return Times
function monitorReturnTimes() {
    const rows = document.querySelectorAll("#pending-requests-table tbody tr");
    const currentTime = new Date().getTime(); // Get current time in milliseconds

    rows.forEach(row => {
        const returnTime = new Date(row.getAttribute("data-return-time")).getTime(); // Get return time in milliseconds
        if (currentTime >= returnTime) {
            row.remove(); // Remove the row from the table
        }
    });

    setTimeout(monitorReturnTimes, 60000); // Check every minute
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

    // Update the cars table
    populateCarsTable();

    // Clear the form
    document.getElementById("add-car-form").reset();
    alert("Car added successfully!");
});

// Logout button functionality
document.getElementById('logout-button').addEventListener('click', function() {
    window.location.href = 'sign_in_form.html'; // Redirect to the sign-in form
});

// Initial population of cars table
populateCarsTable(); 

function toggleMenu() {
    const logoutButton = document.querySelector('.logout-button');
    logoutButton.style.display = logoutButton.style.display === 'none' ? 'block' : 'none';
}
