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

    // Display all forums
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

    // Set fetchForums to run on window load
    window.onload = fetchForums();

    async function removeForum(forumId) {
        try {
            // Send DELETE request to the server with the specified forum ID
            const response = await fetch(`/Community/delete/${forumId}`, {
                method: 'DELETE', // Specify DELETE method
            });
    
            if (response.ok) {
                // If the request was successful, handle the UI update

                const forumElement = document.querySelector(`.forum[data-id="${forumId}"]`);
                if (forumElement) {
                    forumElement.remove();
                }
                console.log(`Forum with ID ${forumId} removed successfully.`);
            } 
            
            else {
                // If the request failed, log an error message
                console.error('Failed to remove forum. Status:', response.status);
            }
        } 
        
        catch (error) {
            // Log any errors that occurred during the fetch
            console.error('Error removing forum:', error);
        }
    }

    window.onload = removeForum(forumId);

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
            forumElement.innerHTML = `
                <h2>${escapeHTML(forum.title)}</h2>

                <div class="interaction">
                    <button class="like-button" data-post-id="${forum.id}">Likes</button>
                    <span class="like-count">${forum.likes}</span>

                    <button class="dislike-button" data-post-id="${forum.id}">Dislikes</button>
                    <span class="dislike-count">${forum.dislikes}</span>
                </div>

                <div class="comments">
                    <div class="comment">${forum.comments} Comments</div>
                </div>
            `;

            container.appendChild(forumElement);

            forumElement.querySelector('.like-button').addEventListener('click', () => handleLike(forum.id));
            forumElement.querySelector('.dislike-button').addEventListener('click', () => handleDislike(forum.id));
        });
    }

    
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    async function handleLike(postId) {
        console.log('Liked post:', postId);

        // Find the specific like button and like count span
        const likeButton = document.querySelector(`.like-button[data-post-id="${postId}"]`);
        const likeCountSpan = likeButton.nextElementSibling;

        // Increment the like count
        likeCountSpan.textContent = parseInt(likeCountSpan.textContent) + 1;

        try {
            const response = await fetch(`/forums/${postId}/like`, {
                method: 'POST',
            });
            if (!response.ok) {
                console.error('Failed to update like count on the server');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function handleDislike(postId) {
        console.log('Disliked post:', postId);

        // Find the specific dislike button and dislike count span
        const dislikeButton = document.querySelector(`.dislike-button[data-post-id="${postId}"]`);
        const dislikeCountSpan = dislikeButton.nextElementSibling;

        // Increment the dislike count
        dislikeCountSpan.textContent = parseInt(dislikeCountSpan.textContent) + 1;

        try {
            const response = await fetch(`/forums/${postId}/dislike`, {
                method: 'POST',
            });
            if (!response.ok) {
                console.error('Failed to update dislike count on the server');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Initialize the form with article data
    const params = getQueryParams();
    if (params.id) {
        fetchArticleData(params.id);
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