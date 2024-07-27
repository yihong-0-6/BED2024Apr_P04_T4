document.addEventListener('DOMContentLoaded', () => {

  // Get User by ID
  const getUserForm = document.getElementById('getUserForm');
  const getUserId = document.getElementById('getUserId');

  if (getUserForm) {
    getUserForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      const id = getUserId.value.trim();
    
      if (id) {
        try {
          const response = await fetch(`http://localhost:3000/users/login/${id}`);

          if (response.ok) {
            const user = await response.json(); // Parse the JSON response

            // Display user details in an alert
            alert(`User Details \nEmail: ${user.email}\nUsername: ${user.username}\nPassword: ${user.password}`);
          } 
          
          else {
            alert('User not found');
          }
        } 
        
        catch (error) {
          alert('Error retrieving user');
        } 
      }
    });
  }
});


  // Update User
  document.getElementById('updateUserForm').addEventListener('submit', async (event) => {
    
    event.preventDefault();
    const id = document.getElementById('updateUserId').value.trim();

    const userData = {
        username: document.getElementById('updateUsername').value.trim(),
        email: document.getElementById('updateEmail').value.trim(),
        password: document.getElementById('updatePassword').value.trim(),
    };

    try {
        const response = await fetch(`http://localhost:3000/users/account/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const updatedUser = await response.json();
            alert(`Updated user' \nEmail: ${user.email}\nUsername: ${user.username}\nPassword: ${user.password}`);
            
            document.getElementById('result').innerHTML = 
            `<pre>${JSON.stringify(updatedUser, null, 2)}</pre>`;
        } 
        
        else {
            document.getElementById('result').textContent 
            = 'Error updating user';
        }
    } 
    
    catch (error) {
        console.error('Error:', error);
        document.getElementById('result').textContent = 'Error updating user';
    }
  });

  // Delete User
  document.getElementById('deleteUserForm').addEventListener('submit', async (event) => {
    
    event.preventDefault();
    const id = document.getElementById('deleteUserId').value.trim();

    try {
        const response = await fetch(`http://localhost:3000/users/remove/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.getElementById('result').textContent = 'User deleted successfully!';
        } 
        
        else {
            document.getElementById('result').textContent = 'Error deleting user';
        }
    } 
    
    catch (error) {
        console.error('Error:', error);
        document.getElementById('result').textContent = 'Error deleting user';
    }
  });

