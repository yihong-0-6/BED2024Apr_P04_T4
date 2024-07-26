document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('/admins/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            alert('Login successful!');
            window.location.href = 'adminDashboard.html'; // Redirect to admin dashboard
        } else {
            document.getElementById('message').innerText = data.message;
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
