document.getElementById('back').addEventListener('click', function() {
  window.location.href = 'Community.html';
});

document.getElementById('forumPost').addEventListener('submit', function(event) {
  event.preventDefault();
  const title = document.getElementById('forumTitle').value;
  const author = document.getElementById('forumAuthor').value;
  const comment = document.getElementById('forumComment').value;

  if (title && author && comment) {
    const forumContainer = document.getElementById('forumContainer');

    // Create a new forum div
    const newForum = document.createElement('div');
    newForum.className = 'forum';

    // Create and append the title
    const newTitle = document.createElement('h2');
    newTitle.textContent = title;
    newForum.appendChild(newTitle);

    // Create and append the author
    const newAuthor = document.createElement('h3');
    newAuthor.textContent = `Author: ${author}`;
    newForum.appendChild(newAuthor);

    // Create and append the comment
    const newComment = document.createElement('div');
    newComment.className = 'comments';
    newComment.innerHTML = `<div class="comment">${comment}</div>`;
    newForum.appendChild(newComment);

    // Add interaction buttons
    const interaction = document.createElement('div');
    interaction.className = 'interaction';
    interaction.innerHTML = `
      <button class="like-button">Likes</button><span class="like-count">0</span>
      <button class="dislike-button">Dislikes</button><span class="dislike-count">0</span>
    `;
    newForum.appendChild(interaction);

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    newForum.appendChild(deleteButton);

    // Append the new forum div to the forum container
    forumContainer.appendChild(newForum);

    // Clear the form fields
    document.getElementById('forumTitle').value = '';
    document.getElementById('forumAuthor').value = '';
    document.getElementById('forumComment').value = '';
  } else {
    alert('Please fill in all fields');
  }
});

// Event delegation for dynamically added elements
document.getElementById('forumContainer').addEventListener('click', function(event) {
  if (event.target.classList.contains('like-button')) {
    const likeCount = event.target.nextElementSibling;
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
  } else if (event.target.classList.contains('dislike-button')) {
    const dislikeCount = event.target.nextElementSibling;
    dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
  } else if (event.target.classList.contains('delete-button')) {
    const forumToDelete = event.target.closest('.forum');
    forumToDelete.remove();
  }
});

// Submit new forum post
document.getElementById('post').addEventListener('click', async function() {
  const title = document.getElementById('forumTitle').value;
  const author = document.getElementById('forumAuthor').value;
  const comments = document.getElementById('forumComment').value;

  try {
    const response = await fetch('/Community/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        author: author,
        comments: comments
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

    // Show error message to the user
    alert('Failed to post forum: ' + error.message);
  }
});

// Fetch a forum by ID
async function fetchForumById(forumId) {
  try {
    const response = await fetch(`/Community/${forumId}`);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error fetching forum: ${response.status} - ${errorMessage}`);
    }

    const forumData = await response.json();
    displayForum(forumData);
  } catch (error) {
    console.error('Error fetching forum by ID:', error);
    alert('Failed to fetch forum: ' + error.message);
  }
}

function displayForum(forumData) {
  const forumContainer = document.getElementById('forumContainer');
  forumContainer.innerHTML = '';

  const forumElement = document.createElement('div');
  forumElement.className = 'forum';
  forumElement.dataset.id = forumData.forumId;

  const forumTitle = document.createElement('h2');
  forumTitle.textContent = forumData.title;
  forumElement.appendChild(forumTitle);

  const forumAuthor = document.createElement('h3');
  forumAuthor.textContent = `Author: ${forumData.author}`;
  forumElement.appendChild(forumAuthor);

  const forumComments = document.createElement('div');
  forumComments.className = 'comments';

  if (Array.isArray(forumData.comments)) {
    forumData.comments.forEach(comment => {
      const commentElement = document.createElement('div');
      commentElement.className = 'comment';
      commentElement.textContent = comment;
      forumComments.appendChild(commentElement);
    });
  } else {
    forumComments.innerHTML = `<div class="comment">${forumData.comments}</div>`;
  }

  forumElement.appendChild(forumComments);

  const interaction = document.createElement('div');
  interaction.className = 'interaction';
  interaction.innerHTML = `
    <button class="like-button" data-post-id="${forumData.forumId}">Likes</button><span class="like-count">${forumData.likes}</span>
    <button class="dislike-button" data-post-id="${forumData.forumId}">Dislikes</button><span class="dislike-count">${forumData.dislikes}</span>
  `;
  forumElement.appendChild(interaction);

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.textContent = 'Delete';
  forumElement.appendChild(deleteButton);

  forumContainer.appendChild(forumElement);

  interaction.querySelector('.like-button').addEventListener('click', () => handleLike(forumData.forumId));
  interaction.querySelector('.dislike-button').addEventListener('click', () => handleDislike(forumData.forumId));
  deleteButton.addEventListener('click', () => handleDelete(forumData.forumId));
}

async function handleLike(forumId) {
  try {
    const likeButton = document.querySelector(`.like-button[data-post-id="${forumId}"]`);
    const likeCountSpan = likeButton.nextElementSibling;

    likeCountSpan.textContent = parseInt(likeCountSpan.textContent) + 1;

    const response = await fetch(`/Community/${forumId}/like`, {
      method: 'POST',
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error liking forum: ${response.status} - ${errorMessage}`);
    }

  } catch (error) {
    console.error('Error handling like:', error);
    alert('Failed to like forum: ' + error.message);
  }
}

async function handleDislike(forumId) {
  try {
    const dislikeButton = document.querySelector(`.dislike-button[data-post-id="${forumId}"]`);
    const dislikeCountSpan = dislikeButton.nextElementSibling;

    dislikeCountSpan.textContent = parseInt(dislikeCountSpan.textContent) + 1;

    const response = await fetch(`/Community/${forumId}/dislike`, {
      method: 'POST',
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error disliking forum: ${response.status} - ${errorMessage}`);
    }

  } catch (error) {
    console.error('Error handling dislike:', error);
    alert('Failed to dislike forum: ' + error.message);
  }
}

async function handleDelete(forumId) {
  try {
    const response = await fetch(`/Community/${forumId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error deleting forum: ${response.status} - ${errorMessage}`);
    }

    const forumElement = document.querySelector(`.forum[data-id="${forumId}"]`);
    if (forumElement) {
      forumElement.remove();
    }

  } catch (error) {
    console.error('Error handling delete:', error);
    alert('Failed to delete forum: ' + error.message);
  }
}

// Fetch and display all forums
async function fetchForums() {
  try {
    const response = await fetch('/Community');

    if (response.ok) {
      const forums = await response.json();
      if (forums) {
        renderForums(forums);
      } else {
        console.error('No forums data received');
      }
    } else {
      console.error('Failed to fetch forums, status:', response.status);
    }
  } catch (error) {
    console.error('Error fetching forums:', error);
  }
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
      <div class="interaction">
        <button class="like-button" data-post-id="${forum.id}">Likes</button>
        <span class="like-count">${forum.likes}</span>
        <button class="dislike-button" data-post-id="${forum.id}">Dislikes</button>
        <span class="dislike-count">${forum.dislikes}</span>
      </div>
      <div class="comments">
        <div class="comment">${forum.comments} Comments</div>
      </div>
      <button class="delete-button" data-post-id="${forum.id}">Delete</button>
    `;

    container.appendChild(forumElement);

    forumElement.querySelector('.like-button').addEventListener('click', () => handleLike(forum.id));
    forumElement.querySelector('.dislike-button').addEventListener('click', () => handleDislike(forum.id));
    forumElement.querySelector('.delete-button').addEventListener('click', () => handleDelete(forum.id));
  });
}

// Utility function to escape HTML to prevent XSS
function escapeHTML(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// Initialize the form with article data
const params = getQueryParams();
if (params.id) {
  fetchArticleData(params.id);
}

// Fetch forums when the window loads
window.onload = function() {
  fetchForums();
};
