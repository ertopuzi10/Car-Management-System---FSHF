// Function to populate assigned cars table
function populateAssignedCarsTable(cars) {
    const assignedCarsTableBody = document.getElementById("assigned-cars-table").querySelector("tbody");
    assignedCarsTableBody.innerHTML = ""; // Clear existing rows
    cars.forEach(car => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${car.plate}</td>
            <td>${car.user}</td>
            <td>${car.dateNeeded}</td>
            <td>${car.returnDate}</td>
            <td>${car.destination}</td>
        `;
        assignedCarsTableBody.appendChild(row);
    });
}

// Function to check for new notifications
function checkForNotifications() {
    const notificationData = window.localStorage.getItem("driverNotification");
    if (notificationData) {
        const car = JSON.parse(notificationData);
        // Populate assigned cars table
        populateAssignedCarsTable([car]);

        // Display notification
        const notificationDiv = document.getElementById("notifications");
        notificationDiv.style.display = "block";
        notificationDiv.innerHTML = `You have been assigned Car ${car.plate} for a trip to ${car.destination}.`;

        // Clear the notification from storage
        window.localStorage.removeItem("driverNotification");
    }
}

// Check for notifications every 2 seconds
setInterval(checkForNotifications, 2000);