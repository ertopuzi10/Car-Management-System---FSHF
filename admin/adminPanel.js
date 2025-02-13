// array per te store makinat qe jane bere fetch from DB
let availableCars = []; 

// fetching backend requests
fetch('fetch_requests.php')
    .then(response => response.json())
    .then(data => {
        const requestsTableBody = document.getElementById("pending-requests-table").querySelector("tbody");
        data.forEach(request => {
            const row = document.createElement("tr");
            row.setAttribute("data-return-time", request.return_date);
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
        // monitorojme datat ne menyre qe kerkesa te fshihet kur data ben expire
        monitorReturnTimes(); 
    })
    .catch(error => console.error('Error fetching pending requests:', error));

// fetch makinat e disponueshme
function fetchAvailableCars() {
    fetch('fetch_cars.php')
        .then(response => response.json())
        .then(cars => {
            availableCars = cars; 
            const carsTableBody = document.getElementById("cars-table").querySelector("tbody");
            carsTableBody.innerHTML = "";
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

// update - ohet disponueshmeria e makines
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
        fetchAvailableCars(); 
    })
    .catch(error => console.error('Error updating car status:', error));
}

// kur paneli behet load shfaqen makinat e diponueshme
fetchAvailableCars();

// monitorim kohor ne lidhje me datat e kthimit
function monitorReturnTimes() {
    const rows = document.querySelectorAll("#pending-requests-table tbody tr");
    const currentTime = new Date().getTime();

    rows.forEach(row => {
        const returnTime = new Date(row.getAttribute("data-return-time")).getTime();
        if (currentTime >= returnTime) {
            row.remove();
        }
    });

    // kontrolli behet cdo minute
    setTimeout(monitorReturnTimes, 60000);
}

// toggle menu e cila permban log out button
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