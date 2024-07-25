document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    console.log(`Extracted movie ID: ${movieId}`); // Add this log

    if (!movieId) {
        alert('Movie ID not found!');
        return;
    }

    console.log(`Fetching movie with ID: ${movieId}`); // Add this log

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

    } catch (error) {
        console.error("Error fetching movie details:", error);
    }
});
