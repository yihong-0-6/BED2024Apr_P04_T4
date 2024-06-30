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

// Fetch the article data and populate the form
async function fetchArticleData(id) {
  try {
      const response = await fetch(`/articles/${id}`);
      const article = await response.json();
      document.getElementById('article-id').value = article.id;
      document.getElementById('title').value = article.title;
      document.getElementById('description').value = article.description;
  } catch (error) {
      console.error('Error fetching article data:', error);
  }
}

// Handle form submission for updating the article
document.getElementById('update-article-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const id = document.getElementById('article-id').value;
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  try {
      const response = await fetch(`/articles/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description }),
      });
      if (response.ok) {
          alert('Article updated successfully');
      } else {
          alert('Error updating article');
      }
  } catch (error) {
      console.error('Error updating article:', error);
  }
});

// Initialize the form with article data
const params = getQueryParams();
if (params.id) {
  fetchArticleData(params.id);
}

//Submitting the form data to database
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
      const response = await fetch('https://localhost:3000/user', {
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
