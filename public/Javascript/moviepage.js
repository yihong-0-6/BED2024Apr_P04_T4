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
            imgElement.src = movie.ImageUrl;
            imgElement.alt = movie.Name;

            console.log(`Image URL for ${movie.Name}: ${imgElement.src}`);

            const titleElement = document.createElement("h2");
            titleElement.textContent = movie.Name;

            const yearElement = document.createElement("p");
            yearElement.textContent = `Published Year: ${movie.Published_Year}`;

            const directorElement = document.createElement("p");
            directorElement.textContent = `Director: ${movie.Director}`;

            const countryElement = document.createElement("p");
            countryElement.textContent = `Country: ${movie.Country}`;

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
