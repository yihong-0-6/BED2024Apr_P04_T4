document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const message = document.getElementById('message');

    // For linking the update button from the industry.html to updateArticle.html
    // Function to get query parameters from the URL
    function getQueryParams() {
        const params = {};
        window.location.search.substring(1).split("&").forEach(function (pair) {
            const [key, value] = pair.split("=");
            params[key] = decodeURIComponent(value);
        });
        return params;
    }
    
    // Submitting the signup form data to the database
    document.getElementById('signupForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
        const email = document.getElementById('signup-email').value;

        const newUser = {
            username: username,
            password: password,
            email: email
        };

        try {
            const response = await fetch('/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                const createdUser = await response.json();
                console.log('User created successfully:', createdUser);
                // Redirect to login page or show success message
            } else {
                console.error('Failed to create user');
                // Show error message to the user
            }
        } catch (error) {
            console.error('Error:', error);
            // Show error message to the user
        }
    });


    // Submitting the login form data
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(loginForm);

        const data = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        try {
            const response = await fetch('/users/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();

                const username = result.username || data.username;

                message.textContent = `Login successful! Welcome, ${username}.`;
            } else {
                message.textContent = 'Login failed. Please check your credentials and try again.';
            }
        } catch (error) {
            message.textContent = 'An error occurred. Please try again later.';
        }
    });

    // Get user by id
    async function getUserById(userId) {
        try {
            const response = await fetch('/login/:id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });

            if (response.ok) {
                const user = await response.json();
                console.log('User fetched successfully:', user);      
            } 
            else {
                console.error('Failed to fetch user');
            }
        } 
        
        catch (error) {
            console.error('Error:', error);
        }
    }

    window.onload = getUserById(userId);    

    async function addUser(username, password, email) {
        try {
            const response = await fetch('/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result.message);
            } else {
                console.error('Failed to add user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    window.onload = addUser(username, password, email);
});