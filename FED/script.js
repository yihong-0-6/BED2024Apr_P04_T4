document.querySelectorAll('.like-button').forEach(button => {
  button.addEventListener('click', function() {
      let likeCount = this.nextElementSibling;
      likeCount.textContent = parseInt(likeCount.textContent) + 1;
  });
});

document.querySelectorAll('.dislike-button').forEach(button => {
  button.addEventListener('click', function() {
      let dislikeCount = this.nextElementSibling;
      dislikeCount.textContent = parseInt(dislikeCount.textContent) - 1;
  });
});

document.getElementById('userForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const formData = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value,
    email: document.getElementById('email').value
  };

  try {
    const response = await fetch('/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Error creating user');
    }

    const newUser = await response.json();
    console.log('User created:', newUser);
    // Handle success, e.g., show a success message or redirect
  } catch (error) {
    console.error('Error:', error);
    // Handle errors, e.g., show an error message
  }
});
