// Event listener for when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // Function to fetch popular movies from the server
    async function fetchPopularMovies() {
        try {
            // Make a GET request to fetch the first six popular movies
            const response = await fetch("http://localhost:3000/movies/firstsix");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse the response as JSON
            const movies = await response.json();
            // Get the container element where popular movies will be displayed
            const popularMoviesContainer = document.getElementById("popular-movies");

            // Iterate over each movie and create HTML elements to display it
            movies.forEach((movie) => {
                const movieItem = document.createElement("div");
                movieItem.classList.add("movie");

                const imgElement = document.createElement("img");
                imgElement.src = `http://localhost:3000${movie.ImageUrl}`;
                imgElement.alt = movie.Name;

                const titleElement = document.createElement("div");
                titleElement.classList.add("movie-name");
                titleElement.textContent = movie.Name;

                // Add click event listener to navigate to the movie details page
                movieItem.addEventListener('click', () => {
                    window.location.href = `moviedetail.html?id=${movie.ID}`;
                });

                movieItem.appendChild(imgElement);
                movieItem.appendChild(titleElement);

                popularMoviesContainer.appendChild(movieItem);
            });
        } catch (error) {
            console.error("Error fetching popular movies:", error);
        }
    }

    // Fetch popular movies when the page loads
    fetchPopularMovies();

    // Function to fetch countries from the server
    async function fetchCountries() {
        try {
            // Make a GET request to fetch the list of countries
            const response = await fetch("http://localhost:3000/countries");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse the response as JSON
            const countries = await response.json();
            // Get the container element where country flags will be displayed
            const countryFlagsContainer = document.getElementById("country-flags");

            // Iterate over each country and create HTML elements to display it
            countries.forEach((country) => {
                const countryItem = document.createElement("div");
                countryItem.classList.add("country");

                const imgElement = document.createElement("img");
                imgElement.src = `http://localhost:3000/Images/country${country.ID}.png`;
                imgElement.alt = country.CountryName;

                const nameElement = document.createElement("div");
                nameElement.classList.add("country-name");
                nameElement.textContent = country.CountryName;

                countryItem.appendChild(imgElement);
                countryItem.appendChild(nameElement);

                // Add click event listener to show the country modal
                countryItem.addEventListener('click', () => {
                    showCountryModal(country.CountryName, country.Description, imgElement.src);
                });

                countryFlagsContainer.appendChild(countryItem);
            });
        } catch (error) {
            console.error("Error fetching country details:", error);
        }
    }

    // Fetch countries when the page loads
    fetchCountries();

    // Function to show the country modal with the provided details
    function showCountryModal(name, description, imageUrl) {
        const modal = document.getElementById("countryModal");
        const countryNameElement = document.getElementById("countryName");
        const countryDescriptionElement = document.getElementById("countryDescription");
        const countryImageElement = document.getElementById("countryImage");

        countryNameElement.textContent = name;
        countryDescriptionElement.textContent = description;
        countryImageElement.src = imageUrl;

        modal.style.display = "block";
    }

    // Get the modal and close button elements
    const modal = document.getElementById("countryModal");
    const closeButton = document.querySelector(".modal .close");

    // Add click event listener to the close button to hide the modal
    closeButton.onclick = function () {
        modal.style.display = "none";
    }

    // Add click event listener to the window to hide the modal if the user clicks outside of it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});
