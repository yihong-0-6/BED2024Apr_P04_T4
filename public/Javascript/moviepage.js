async function fetchMovies() {
    try {
        const response = await fetch("http://localhost:3000/movies");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const movieList = document.getElementById("movie-list");

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
                console.log(`Navigating to: ${detailUrl}`); // Add this log
                window.location.href = detailUrl;
            });

            movieItem.appendChild(imgElement);
            movieItem.appendChild(titleElement);
            movieItem.appendChild(yearElement);
            movieItem.appendChild(directorElement);
            movieItem.appendChild(countryElement);

            movieList.appendChild(movieItem);
        });
    } catch (error) {
        console.error("Error fetching movie details:", error);
    }
}

fetchMovies();
