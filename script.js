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