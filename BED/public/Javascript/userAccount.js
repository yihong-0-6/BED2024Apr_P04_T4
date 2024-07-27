document.getElementById('forgotPasswordForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  const email = document.getElementById('email').value.trim(); // Get the email input value

  if (!email) {
      document.getElementById('resetMessage').textContent = 'Please enter your email address.';
      document.getElementById('resetMessage').style.color = 'red';
      return;
  }

  try {
      const response = await fetch(`http://localhost:3000/users/forgotpassword/${email}`, {
          
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },

          body: JSON.stringify({ email })
      });

      const result = await response.json();

      if (response.ok) {
          document.getElementById('resetlinkBtn').textContent = result.message;
          document.getElementById('resetlinkBtn').style.color = 'green';
          window.location.href = "confirmpassword.html";
      } 
      
      else {
          document.getElementById('resetlinkBtn').textContent = result.message || 'Failed to send reset link. Please try again.';
          document.getElementById('resetlinkBtn').style.color = 'red';
      }
  } 
  
  catch (error) {
      document.getElementById('resetlinkBtn').textContent = 'Error sending reset link. Please try again later.';
      document.getElementById('resetlinkBtn').style.color = 'red';
  }
});




document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  if (token) {
      document.getElementById('token').value = token;
  }

  document.getElementById('resetPasswordForm').addEventListener('submit', async (event) => {
      
      event.preventDefault();
      const password = document.getElementById('password').value.trim();
      const confirmPassword = document.getElementById('confirmPassword').value.trim();
      const token = document.getElementById('token').value;

      if (password !== confirmPassword) {
          document.getElementById('resetPasswordBtn').textContent = 'Passwords do not match.';
          return;
      }

      try {
          const response = await fetch('http://localhost:3000/users/verifyPassword', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token, password })
          });

          const result = await response.json();
          document.getElementById('resetPasswordBtn').textContent = result.message;
      } 
      
      catch (error) {
          document.getElementById('resetPasswordBtn').textContent = 'Error resetting password. Please try again later.';
      }
  });
});


