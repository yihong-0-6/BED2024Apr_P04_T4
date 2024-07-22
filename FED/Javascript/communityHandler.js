document.addEventListener('DOMContentLoaded', function() {
  const forumContainer = document.getElementById('forumContainer');
  const forumPosts = JSON.parse(localStorage.getItem('forumPosts')) || [];

  forumPosts.forEach(forumPost => {
      // Create a new forum div
      const newForum = document.createElement('div');
      newForum.className = 'forum';

      // Create and append the title
      const newTitle = document.createElement('h2');
      newTitle.textContent = forumPost.title;
      newForum.appendChild(newTitle);

      // Create and append the author
      const newAuthor = document.createElement('h3');
      newAuthor.textContent = `Author: ${forumPost.author}`;
      newForum.appendChild(newAuthor);

      // Create and append the comment
      const newComment = document.createElement('div');
      newComment.className = 'comments';
      newComment.innerHTML = `<div class="comment">${forumPost.comment}</div>`;
      newForum.appendChild(newComment);

      // Add interaction buttons
      const interaction = document.createElement('div');
      interaction.className = 'interaction';
      interaction.innerHTML = `
          <button class="like-button">Likes</button><span class="like-count">${forumPost.likes}</span>
          <button class="dislike-button">Dislikes</button><span class="dislike-count">${forumPost.dislikes}</span>
      `;
      newForum.appendChild(interaction);

      // Add delete button
      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-button';
      deleteButton.textContent = 'Delete';
      newForum.appendChild(deleteButton);

      // Append the new forum div to the forum container
      forumContainer.appendChild(newForum);
  });

  // Event delegation for dynamically added elements
  forumContainer.addEventListener('click', function(event) {
      if (event.target.classList.contains('like-button')) {
          const likeCount = event.target.nextElementSibling;
          likeCount.textContent = parseInt(likeCount.textContent) + 1;
      } else if (event.target.classList.contains('dislike-button')) {
          const dislikeCount = event.target.nextElementSibling;
          dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
      } else if (event.target.classList.contains('delete-button')) {
          const forumToDelete = event.target.closest('.forum');
          forumToDelete.remove();

          // Update localStorage
          const updatedForumPosts = forumPosts.filter(post => post.comment !== forumToDelete.querySelector('.comment').textContent);
          localStorage.setItem('forumPosts', JSON.stringify(updatedForumPosts));
      }
  });
});
