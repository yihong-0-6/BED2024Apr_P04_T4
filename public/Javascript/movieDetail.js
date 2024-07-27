document.addEventListener("DOMContentLoaded", function () {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const movieId = getQueryParam('id');
    if (!movieId) {
        console.error('Movie ID not found in URL');
        return;
    }

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
            document.getElementById('movie-year').textContent = movie.Published_Year;
            document.getElementById('movie-director').textContent = movie.Director;
            document.getElementById('movie-country').textContent = movie.Country;
            document.getElementById('movie-trailer').src = movie.TrailerUrl;
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    }

    fetchMovieDetails(movieId);
});
