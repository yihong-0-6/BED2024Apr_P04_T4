document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");

  signupForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent the default form submission

      // Get form input values
      const email = document.getElementById("signup-email").value.trim();
      const username = document.getElementById("signup-username").value.trim();
      const password = document.getElementById("signup-password").value.trim();

      // Validate input values
      if (!email || !username || !password) {
          alert("Please fill in all fields.");
          return;
      }

      // Construct the request body
      const requestBody = {
          email: email,
          username: username,
          password: password,
      };

      try {
          // Make a POST request to the signup endpoint
          const response = await fetch("http://localhost:3000/users/account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        
          // Check if the response was successful
          if (response.ok) {
              alert("Sign up successful! Please log in.");
              window.location.href = "mainlogin.html"; // Redirect to login page
          } 
          
          else {
              alert("Sign up failed. Please try again.");
          }
      } 
      
      catch (error) {
          console.error("Error during signup:", error);
          alert("An error occurred during signup. Please try again.");
      }
  });
});
