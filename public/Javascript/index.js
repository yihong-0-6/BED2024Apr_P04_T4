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

async function fetchCountries() {
    try {
        const response = await fetch("http://localhost:3000/countries");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const countries = await response.json();
        const countryFlagsContainer = document.getElementById("country-flags");

        countries.forEach((country) => {
            const countryItem = document.createElement("div");
            countryItem.classList.add("country");

            const imgElement = document.createElement("img");
            imgElement.src = `http://localhost:3000/Images/country${country.ID}.png`; // Adjust the URL based on your image path
            imgElement.alt = country.CountryName;

            const titleElement = document.createElement("h3");
            titleElement.textContent = country.CountryName;

            countryItem.appendChild(imgElement);
            countryItem.appendChild(titleElement);

            countryFlagsContainer.appendChild(countryItem);
        });
    } catch (error) {
        console.error("Error fetching country details:", error);
    }
}

fetchCountries();
