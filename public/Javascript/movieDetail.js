document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    if (!movieId) {
        alert('Movie ID not found!');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/movies/${movieId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const movie = await response.json();
        document.getElementById('movie-name').textContent = movie.Name;
        document.getElementById('movie-image').src = `http://localhost:3000${movie.ImageUrl}`;
        document.getElementById('movie-details').textContent = `
            Published Year: ${movie.Published_Year}
            Director: ${movie.Director}
            Country: ${movie.Country}
        `;

        document.getElementById('buy-button').addEventListener('click', () => {
            alert('Purchase functionality not implemented yet.');
        });
    } catch (error) {
        console.error("Error fetching movie details:", error);
    }
});
