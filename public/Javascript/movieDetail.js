document.addEventListener("DOMContentLoaded", function () {
    // Function to get query string parameters
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get the movie ID from the query string
    const movieId = getQueryParam('id');
    if (!movieId) {
        console.error('Movie ID not found in URL');
        return;
    }

    // Function to fetch and display movie details
    async function fetchMovieDetails(id) {
        try {
            const response = await fetch(`http://localhost:3000/movies/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const movie = await response.json();
            document.getElementById('movie-title').textContent = movie.Name;
            document.getElementById('movie-image').src = `http://localhost:3000${movie.ImageUrl}`;
            document.getElementById('movie-image').alt = movie.Name;
            document.getElementById('movie-description').textContent = movie.Description;
            document.getElementById('movie-year').textContent = `Published Year: ${movie.Published_Year}`;
            document.getElementById('movie-director').textContent = `Director: ${movie.Director}`;
            document.getElementById('movie-country').textContent = `Country: ${movie.Country}`;
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    }

    // Fetch and display the movie details
    fetchMovieDetails(movieId);
});
