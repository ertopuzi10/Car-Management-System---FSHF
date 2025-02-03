document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signInForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(this);
        
        fetch('login.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log('Response from login.php:', data); // Log the response
            if (data.includes("Login successful")) {
                const role = data.split(" ")[3]; // Assuming the role is included in the response
                console.log('Parsed role:', role); // Log the parsed role
                let fileName = '';
                if (role === 'driver') {
                    fileName = 'driverPanel.html';
                    window.location.href = `../driver/${fileName}`;
                } else if (role === 'admin') {
                    fileName = 'adminPanel.html';
                    window.location.href = `../admin/${fileName}`;
                } else if (role === 'departments_employee') {
                    fileName = 'index.html';
                    window.location.href = `../requestForm/${fileName}`;
                }
                // alert(`You are logged in as ${role}. Redirecting to ${fileName}.`);
            } else {
                alert(data); // Show error message
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
