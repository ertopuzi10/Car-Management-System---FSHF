// hide or show password
document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('bx bxs-lock-alt');
        this.classList.toggle('bx bxs-lock-open-alt');
    });

    document.getElementById('signInForm').addEventListener('submit', function(event) {
        console.log('Login button clicked'); 

        event.preventDefault();
        
        const formData = new FormData(this);
        
        // fetch te dhenat e perdoruesit nga DB
        fetch('authenticate.php', {
            method: 'POST',
            body: formData
        })
        // ne formen json
        .then(response => response.json())


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
