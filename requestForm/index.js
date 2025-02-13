// kontroll per kredencialet e perdoruesit
fetch('../regist/check_auth.php')
    .then(response => response.json())
    .then(data => {
        if (!data.loggedin) {
            window.location.href = '../regist/sign_log.html';
        }
    });

// shfaqja e formatit te kohes ne varesi te selektimit
document.getElementById("time_format").addEventListener("change", function(event) {
    const isHours = event.target.value === "hours";
    document.getElementById("time_get").style.display = isHours ? "block" : "none";
    document.getElementById("time_turn").style.display = isHours ? "block" : "none";
});

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
