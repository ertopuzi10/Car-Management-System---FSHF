let availableCars = [];

// Fetch kërkesat nga backend-i
fetch("fetch_requests.php")
  .then((response) => response.json())
  .then((data) => {
    const requestsTableBody = document
      .getElementById("pending-requests-table")
      .querySelector("tbody");

    data.forEach((request) => {
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
                        <option value="">-- Zgjidh makinën --</option>
                        ${availableCars
                          .filter((car) => car.status === "available")
                          .map(
                            (car) =>
                              `<option value="${car.car_plate}">${car.car_plate}</option>`
                          )
                          .join("")}
                    </select>
                    <button onclick="assignCar('${request.id}')">Assign</button>
                    <a href="report_page.php?request_id=${
                      request.id
                    }" target="_blank" class="btn btn-primary">Gjenero Raport</a>
                </td>
            `;
      requestsTableBody.appendChild(row);
    });

    monitorReturnTimes();
  })
  .catch((error) => console.error("Error fetching pending requests:", error));

// Funksioni për të caktuar një makinë për një kërkesë
function assignCar(requestId) {
  console.log("assignCar() u thirr për request_id:", requestId);

  const carSelect = document.getElementById(`car-select-${requestId}`);
  const selectedCarPlate = carSelect ? carSelect.value : null;

  console.log("Targa e zgjedhur:", selectedCarPlate);

  if (!selectedCarPlate) {
    alert("Ju lutem zgjidhni një makinë.");
    return;
  }

  fetch("assign_car.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      request_id: requestId,
      car_plate: selectedCarPlate,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Përgjigja nga serveri:", data);
      if (data.success) {
        alert("Makinë e caktuar me sukses!");

        // Përdorimi i funksionit për të ndryshuar statusin e makinës
        updateCarStatus(selectedCarPlate, "unavailable");

        // Heqja e makinës nga dropdown
        carSelect.querySelector(`option[value="${selectedCarPlate}"]`).remove();

        // Rifreskojmë dropdown-et për kërkesat
        updateDropdowns();
      } else {
        alert("Gabim: " + data.message);
      }
    })
    .catch((error) => console.error("Gabim:", error));
}

// Fetch makinat e disponueshme
function fetchAvailableCars() {
  fetch("fetch_cars.php")
    .then((response) => response.json())
    .then((cars) => {
      availableCars = cars.filter((car) => car.status === "available"); // Filtro vetëm makinat e disponueshme
      const carsTableBody = document
        .getElementById("cars-table")
        .querySelector("tbody");
      carsTableBody.innerHTML = "";
      availableCars.forEach((car) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${car.car_plate}</td>
                    <td>${car.driver_name}</td>
                    <td>
                        <select class="status-dropdown" onchange="updateCarStatus('${
                          car.car_plate
                        }', this.value)">
                            <option value="available" ${
                              car.status === "available" ? "selected" : ""
                            }>Available</option>
                            <option value="unavailable" ${
                              car.status === "unavailable" ? "selected" : ""
                            }>Unavailable</option>
                        </select>
                    </td>
                `;
        carsTableBody.appendChild(row);
      });

      // Rifreskojmë dropdown-et për kërkesat
      updateDropdowns();
    })
    .catch((error) => console.error("Error fetching available cars:", error));
}

// Përditësohet disponueshmëria e makinës
function updateCarStatus(carPlate, status) {
  fetch("update_car_status.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plate: carPlate, status: status }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Car status updated:", data);

      // Rifreskojmë listën e makinave të disponueshme
      fetchAvailableCars();
    })
    .catch((error) => console.error("Error updating car status:", error));
}

// Rifreskon dropdown-et në kërkesat për makinat e disponueshme
function updateDropdowns() {
  document.querySelectorAll("select[id^='car-select-']").forEach((dropdown) => {
    const requestId = dropdown.id.replace("car-select-", "");
    dropdown.innerHTML = `
      <option value="">-- Zgjidh makinën --</option>
      ${availableCars
        .map(
          (car) => `<option value="${car.car_plate}">${car.car_plate}</option>`
        )
        .join("")}
    `;
  });
}

// Kur paneli bëhet load, shfaqen makinat e disponueshme
fetchAvailableCars();

// Monitorim kohor në lidhje me datat e kthimit
function monitorReturnTimes() {
  const rows = document.querySelectorAll("#pending-requests-table tbody tr");
  const currentTime = new Date().getTime();

  rows.forEach((row) => {
    const returnTime = new Date(row.getAttribute("data-return-time")).getTime();
    if (currentTime >= returnTime) {
      row.remove();
    }
  });

  // Kontrolli bëhet çdo minutë
  setTimeout(monitorReturnTimes, 60000);
}

// Toggle menu që përmban butonin "Log Out"
function toggleMenu() {
  const logoutButton = document.querySelector(".logout-button");
  logoutButton.style.display =
    logoutButton.style.display === "none" ? "block" : "none";
}

function removeSession() {
  fetch("../logout.php").then((response) => {
    window.location.href = "../regist/sign_log.php";
  });
}
