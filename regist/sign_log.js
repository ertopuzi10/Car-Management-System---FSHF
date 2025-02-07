// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('signInForm').addEventListener('submit', function(event) {
//         event.preventDefault();
        
//         const formData = new FormData(this);
        
//         fetch('login.php', {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => response.text())
//         .then(data => {
//             console.log('Response from login.php:', data); // Log the response
//             if (data.includes("Login successful")) {
//                 const role = data.split(" ")[3]; // Assuming the role is included in the response
//                 console.log('Parsed role:', role); // Log the parsed role
//                 let fileName = '';
//                 if (role === 'driver') {
//                     fileName = 'driverPanel.php';
//                     window.location.href = `../driver/${fileName}`;
//                 } else if (role === 'admin') {
//                     fileName = 'adminPanel.php';
//                     window.location.href = `../admin/${fileName}`;
//                 } else if (role === 'departments_employee') {
//                     fileName = 'index.php';
//                     window.location.href = `../requestForm/${fileName}`;
//                 }
//                 // alert(`You are logged in as ${role}. Redirecting to ${fileName}.`);
//             } else {
//                 alert(data); // Show error message
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     });
// });


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signInForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(this);
        
        fetch('authenticate.php', { // Use the correct PHP file
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) // Expect JSON response
        .then(data => {
            console.log('Response:', data);

            if (data.status === "success") {
                let fileName = '';

                if (data.role === 'driver') {
                    fileName = 'driverPanel.php';
                    window.location.href = `../driver/${fileName}`;
                } else if (data.role === 'admin') {
                    fileName = 'adminPanel.php';
                    window.location.href = `../admin/${fileName}`;
                } else if (data.role === 'departments_employee') {
                    fileName = 'index.php';
                    window.location.href = `../requestForm/${fileName}`;
                }
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

