document.getElementById('back').addEventListener('click', function() {
  window.location.href = 'Community.html';
});

document.getElementById('forumPost').addEventListener('submit', async function(event) {
  event.preventDefault();
  const title = document.getElementById('forumTitle').value;
  const author = document.getElementById('forumAuthor').value;
  const message = document.getElementById('forumComment').value || ''; // Default to empty string if no input

  if (title && author && message) { // Updated variable name
      try {
          const response = await fetch('http://localhost:3000/Community/create', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  title: title,
                  author: author,
                  message: message // Updated field name
              })
          });

          if (!response.ok) {
              const errorMessage = await response.text();
              throw new Error(`Server error: ${response.status} - ${errorMessage}`);
          }

          const data = await response.json();
          if (!data) {
              throw new Error('Server returned empty response');
          }

          // Assuming you want to redirect or update the page upon successful post
          window.location.href = 'Community.html';
      } catch (error) {
          console.error('Error posting forum:', error);
          alert('Failed to post forum: ' + error.message);
      }
  } else {
      alert('Please fill in all fields');
  }
});



async function fetchForums() {
  try {
      const response = await fetch('http://localhost:3000/Community/forums');

      if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Failed to fetch forums, status: ${response.status}, message: ${errorMessage}`);
      }

      const forums = await response.json();
      if (forums) {
          renderForums(forums);
      } else {
          console.error('No forums data received');
          alert('No forums data received');
      }
  } catch (error) {
      console.error('Error fetching forums:', error);
      alert('Error fetching forums: ' + error.message);
  }
}

function addDeleteEventListeners() {
  document.querySelectorAll('.delete-button').forEach(button => {
      button.addEventListener('click', function() {
          const forumId = this.getAttribute('data-post-id');
          handleDelete(forumId);
      });
  });
}

function renderForums(forums) {
  const container = document.getElementById('forums-container');
  if (!container) {
      console.error('Container element not found');
      return;
  }

  container.innerHTML = ''; // Clear existing content

  forums.forEach(forum => {
    const forumElement = document.createElement('div');
    forumElement.className = 'forum';
    forumElement.dataset.id = forum.id; // Set data-id attribute
    forumElement.innerHTML = `
        <h2>${escapeHTML(forum.title)}</h2>
        <h3>${escapeHTML(forum.author)}</h3>
        <div class="comments">
            <div class="comment">${escapeHTML(forum.message)} Comments</div> <!-- Updated field name -->
        </div>
        <button class="delete-button" data-post-id="${forum.id}">Delete</button>
    `;

    container.appendChild(forumElement);
  });

  addDeleteEventListeners(); // Attach delete event listeners after rendering
}

