function fetchAssignedCars() {
    fetch('fetch_assigned_cars.php')
        .then(response => response.json())
        .then(cars => {
            populateAssignedCarsTable(cars);
        })
        .catch(error => console.error('Error fetching assigned cars:', error));
}
document.addEventListener('DOMContentLoaded', fetchAssignedCars);


// popullimi i tabeles me makina te selektuara
function populateAssignedCarsTable(cars) {
    const currentDate = new Date();

    const assignedCarsTableBody = document.getElementById("assigned-cars-table").querySelector("tbody");
    assignedCarsTableBody.innerHTML = "";
    cars.forEach(car => {
        const returnDate = new Date(car.return_date);
        if (currentDate <= returnDate) { 
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${car.car_plate}</td>
                <td>${car.driver_name}</td>
                <td>${car.start_date}</td>
                <td>${car.return_date}</td>
                <td>${car.destination}</td>
            `;
            assignedCarsTableBody.appendChild(row);
        }
    });
}

// behet check per njoftime te reja
function checkForNotifications() {
    const notificationData = window.localStorage.getItem("driverNotification");
    if (notificationData) {
        const car = JSON.parse(notificationData);
        populateAssignedCarsTable([car]);

        const notificationDiv = document.getElementById("notifications");
        notificationDiv.style.display = "block";
        notificationDiv.innerHTML = `You have been assigned Car ${car.car_plate} for a trip to ${car.destination}.`;

        // Clear the notification from storage
        window.localStorage.removeItem("driverNotification");
    }
}

// njoftimet behen check cdo 2 sekonda
setInterval(checkForNotifications, 2000);


//menu e cila permban log out button
function toggleMenu() {
    const logoutButton = document.querySelector('.logout-button');
    logoutButton.style.display = logoutButton.style.display === 'none' ? 'block' : 'none';
}

function removeSession() {
    fetch('../logout.php')
    .then(response => {
        window.location.href = '../regist/sign_log.php';
    });
}
