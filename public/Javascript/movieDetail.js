// Event listener for when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // Function to get query parameter from the URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get the movie ID from the URL query parameters
    const movieId = getQueryParam('id');
    if (!movieId) {
        console.error('Movie ID not found in URL');
        return;
    }

    // Function to fetch movie details from the server
    async function fetchMovieDetails(id) {
        try {
            // Make a GET request to fetch the movie details by ID
            const response = await fetch(`http://localhost:3000/movies/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse the response as JSON
            const movie = await response.json();
            // Populate the HTML elements with the fetched movie details
            document.getElementById('movie-title').textContent = movie.Name;
            document.getElementById('movie-image').src = `http://localhost:3000${movie.ImageUrl}`;
            document.getElementById('movie-image').alt = movie.Name;
            document.getElementById('movie-description').textContent = movie.Description;
            document.getElementById('movie-year').textContent = movie.Published_Year;
            document.getElementById('movie-director').textContent = movie.Director;
            document.getElementById('movie-country').textContent = movie.Country;
            document.getElementById('movie-trailer').src = movie.TrailerUrl;
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    }

    // Fetch the movie details using the fetched movie ID
    fetchMovieDetails(movieId);
});
