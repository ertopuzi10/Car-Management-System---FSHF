function toggleMenu() {
    const logoutButton = document.querySelector('.logout-button');
    logoutButton.style.display = logoutButton.style.display === 'none' ? 'block' : 'none';
}

// Check if the user is authenticated
fetch('../regist/check_auth.php')
    .then(response => response.json())
    .then(data => {
        if (!data.loggedin) {
            // Redirect to login page if not authenticated
            window.location.href = '../regist/sign_log.html';
        }
    });

// Show/hide time inputs based on selected time format
document.getElementById("time_format").addEventListener("change", function(event) {
    const isHours = event.target.value === "hours";
    document.getElementById("time_get").style.display = isHours ? "block" : "none";
    document.getElementById("time_turn").style.display = isHours ? "block" : "none";
});

function removeSession(){
    // Clear session storage or local storage if using token-based auth
    sessionStorage.removeItem('authToken'); // or localStorage.removeItem('authToken');

    // Redirect to login page
    window.location.href = '../regist/sign_log.html';
}
