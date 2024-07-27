document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const messageDiv = document.getElementById('message');

  // Function to handle user login
  async function login(event) {
      event.preventDefault(); // Prevent default form submission

      const username = document.getElementById('login-username').value.trim();
      const password = document.getElementById('login-password').value.trim();

      if (!username || !password) {
          showMessage('Please enter both username and password.');
          return;
      }

      try {
          // Send login request
          const response = await 
          fetch('http://localhost:3000/users/account/login', { 

              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
          });

          const result = await response.json();

          if (response.ok) {
              // Redirect to main page on successful login
              window.location.href = 'index.html'; 
          } else {
              showMessage(result.message || 'Login failed. Please try again.');
          }
      } 
      
      catch (error) {
          showMessage('An error occurred while logging in.');
          console.error('Login error:', error);
      }
  }

  // Function to display messages to the user
  function showMessage(message) {
      messageDiv.textContent = message;
      messageDiv.style.color = 'red'; 
  }

  // Attach event listener to the login form
  if (loginForm) {
      loginForm.addEventListener('submit', login);
  }
});
