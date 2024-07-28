// Function to fetch and display movies
async function fetchMovies() {
    try {
        // Fetch movies from the server
        const response = await fetch("http://localhost:3000/movies");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response as JSON
        const data = await response.json();
        // Get the movie list container element
        const movieList = document.getElementById("movie-list");

        // Iterate over each movie and create HTML elements to display them
        data.forEach((movie) => {
            const movieItem = document.createElement("div");
            movieItem.classList.add("movie");

            const imgElement = document.createElement("img");
            imgElement.src = `http://localhost:3000${movie.ImageUrl}`;
            imgElement.alt = movie.Name;

            const titleElement = document.createElement("h2");
            titleElement.textContent = movie.Name;

            const yearElement = document.createElement("p");
            

            const directorElement = document.createElement("p");
            

            const countryElement = document.createElement("p");
            

            // Add click event listener to navigate to movieDetail.html with the movie ID
            movieItem.addEventListener('click', () => {
                const detailUrl = `movieDetail.html?id=${movie.ID}`;
                console.log(`Navigating to: ${detailUrl}`); // Add this log for debugging
                window.location.href = detailUrl;
            });

            // Append created elements to the movie item
            movieItem.appendChild(imgElement);
            movieItem.appendChild(titleElement);
            movieItem.appendChild(yearElement);
            movieItem.appendChild(directorElement);
            movieItem.appendChild(countryElement);

            // Append the movie item to the movie list container
            movieList.appendChild(movieItem);
        });
    } catch (error) {
        // Log any errors that occur during fetch
        console.error("Error fetching movie details:", error);
    }
}

// Call the fetchMovies function to fetch and display movies when the DOM is fully loaded
fetchMovies();
