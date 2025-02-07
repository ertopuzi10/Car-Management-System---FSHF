let availableCars = []; // Store fetched cars

// Fetch pending requests from the backend
fetch('fetch_requests.php')
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
                        ${availableCars.filter(car => car.status === 'available').map(car => `<option value="${car.car_plate}">${car.car_plate}</option>`).join('')}
                    </select>
                    <button onclick="assignCar('${request.id}', '${request.first_name} ${request.last_name}', '${request.date_needed}', '${request.return_date}', '${request.destination}')">Assign</button>
                </td>
            `;
            requestsTableBody.appendChild(row);
        });
        monitorReturnTimes(); // Start monitoring return times
    })
    .catch(error => console.error('Error fetching pending requests:', error));

// Function to fetch available cars
function fetchAvailableCars() {
    fetch('fetch_cars.php')
        .then(response => response.json())
        .then(cars => {
            availableCars = cars; // Store fetched cars
            const carsTableBody = document.getElementById("cars-table").querySelector("tbody"); // Updated ID
            carsTableBody.innerHTML = ""; // Clear existing rows
            cars.forEach(car => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${car.car_plate}</td>
                    <td>${car.driver_name}</td>
                    <td>
                        <select class="status-dropdown" onchange="updateCarStatus('${car.car_plate}', this.value)">
                            <option value="available" ${car.status === 'available' ? 'selected' : ''}>Available</option>
                            <option value="unavailable" ${car.status === 'unavailable' ? 'selected' : ''}>Unavailable</option>
                        </select>
                    </td>
                `;
                carsTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching available cars:', error));
}

// Function to update car status
function updateCarStatus(carPlate, status) {
    fetch('update_car_status.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plate: carPlate, status: status }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Car status updated:', data);
        fetchAvailableCars(); // Refresh the available cars table
    })
    .catch(error => console.error('Error updating car status:', error));
}

// Call fetchAvailableCars when the admin panel loads
fetchAvailableCars();

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

// Logout button functionality
document.getElementById('logout-button').addEventListener('click', function() {
    window.location.href = 'sign_in_form.html'; // Redirect to the sign-in form
});

// Function to toggle menu visibility
function toggleMenu() {
    const logoutButton = document.querySelector('.logout-button');
    logoutButton.style.display = logoutButton.style.display === 'none' ? 'block' : 'none';
}

function removeSession() {
    // Call PHP script to destroy session
    fetch('../logout.php')
    .then(response => {
        // Redirect to login page after session is destroyed
        window.location.href = '../regist/sign_log.php';
    });
}
