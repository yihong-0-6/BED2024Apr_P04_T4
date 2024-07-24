async function fetchPopularMovies() {
    try {
        const response = await fetch("http://localhost:3000/movies/firstsix");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const movies = await response.json();
        const popularMoviesContainer = document.getElementById("popular-movies");

        movies.forEach((movie) => {
            const movieItem = document.createElement("div");
            movieItem.classList.add("movie");

            const imgElement = document.createElement("img");
            imgElement.src = `http://localhost:3000${movie.ImageUrl}`;
            imgElement.alt = movie.Name;

            const titleElement = document.createElement("div");
            titleElement.classList.add("movie-name");
            titleElement.textContent = movie.Name;

            // Add click event listener to navigate to purchase page
            movieItem.addEventListener('click', () => {
                window.location.href = `purchase.html?id=${movie.ID}`;
            });

            movieItem.appendChild(imgElement);
            movieItem.appendChild(titleElement);

            popularMoviesContainer.appendChild(movieItem);
        });
    } catch (error) {
        console.error("Error fetching popular movies:", error);
    }
}

fetchPopularMovies();
