

document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display forums on page load
    fetchForums();
  
    // Back button functionality
    const backButton = document.getElementById('back');
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = 'Community.html'; // Redirect to Community page
        });
    }
  
    // Handle forum post form submission
    const forumPostForm = document.getElementById('forumPost');
    if (forumPostForm) {
        forumPostForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const title = document.getElementById('forumTitle').value;
            const author = document.getElementById('forumAuthor').value;
            const message = document.getElementById('forumComment').value || '';
  
            if (title && author && message) {
                try {
                    const response = await fetch('http://localhost:3000/Community/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            title: title,
                            author: author,
                            message: message
                        })
                    });
  
                    if (!response.ok) {
                        const errorMessage = await response.text();
                        throw new Error(`Server error: ${response.status} - ${errorMessage}`);
                    }
  
                    window.location.href = 'Community.html'; // Redirect after successful post
                } catch (error) {
                    console.error('Error posting forum:', error);
                    alert('Failed to post forum: ' + error.message);
                }
            } else {
                alert('Please fill in all fields');
            }
        });
    }
  
    // Fetch forums from the server
    async function fetchForums() {
        try {
            const response = await fetch('http://localhost:3000/Community');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
  
            const forums = await response.json();
            renderForums(forums); // Render forums on the page
        } 
        catch (error) {
            console.error('Error fetching forums:', error);
        }
    }
  
    // Render forums into the container
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
                    <div class="comment">${escapeHTML(forum.message)}</div>
                </div>
                <button class="delete-button" data-post-id="${forum.id}">Delete</button>
            `;
  
            container.appendChild(forumElement);
        });
  
        addDeleteEventListeners(); // Attach delete event listeners after rendering
    }
  
    // Fetch a forum by ID
    async function getForumById(forumId) {
        try {
            const response = await fetch(`http://localhost:3000/Community/id/${forumId}`);
  
            const forum = await response.json();
            return forum;
        } 
        
        catch (error) {
            console.error('Error fetching forum by ID:', error);
            alert('Error fetching forum');
            return null;
        }
    }
  
    // Display a single forum
    function displayForum(forum) {
        const container = document.getElementById('forums-container');
        if (container) {
            container.innerHTML = `
                <div class="forum">
                    <h2>${escapeHTML(forum.title)}</h2>
                    <h3>${escapeHTML(forum.author)}</h3>
                    <div class="comments">
                        <div class="comment">${escapeHTML(forum.message)}</div>
                    </div>
                </div>
            `;
        } else {
            console.error('Container element not found');
        }
    }
  
    // Escape HTML characters to prevent XSS attacks
    function escapeHTML(str = '') {
        return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
    }
  
    // Event listener for the search button
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', async function() {
            const searchValue = document.getElementById('searchInput').value.trim();
            if (searchValue) {
                const forum = await getForumById(searchValue);
                if (forum) {
                    displayForum(forum);
                }
            }
        });
    }
  
    // Add event listeners to delete buttons
    async function handleDelete(forumId) {
        try {
            await fetch(`http://localhost:3000/Community/remove/${forumId}`, {
                method: 'DELETE',
            });
    
            alert('Forum deleted successfully');
            removeForumFromDOM(forumId);
        } 
        
        catch (error) {
            console.error('Error deleting forum:', error);
            alert('Error deleting forum: ' + error.message);
        }
    }
    
    function removeForumFromDOM(forumId) {
        const forumElement = document.querySelector(`.forum[data-post-id="${forumId}"]`);
        if (forumElement) {
            forumElement.remove();
        } 
        
        else {
            console.warn(`Forum element with ID ${forumId} not found in the DOM`);
        }
    }
    
    function addDeleteEventListeners() {
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', function() {
                const forumId = this.getAttribute('data-post-id');
  
                if (forumId) {
                    handleDelete(forumId);
                } 
                
                else {
                    console.warn('No forum ID found on delete button');
                }
            });
        });
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        addDeleteEventListeners();
    });
  });
    
    