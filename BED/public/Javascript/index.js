const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

router.get('/industry', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/industry.html'));
});

router.get('/Community', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/Community.html'));
});

module.exports = router;

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

            const nameElement = document.createElement("div");
            nameElement.classList.add("country-name");
            nameElement.textContent = country.CountryName;

            countryItem.appendChild(imgElement);
            countryItem.appendChild(nameElement);

            // Add click event listener to show country details in a modal
            countryItem.addEventListener('click', () => {
                showCountryModal(country.CountryName, country.Description, imgElement.src);
            });

            countryFlagsContainer.appendChild(countryItem);
        });
    } catch (error) {
        console.error("Error fetching country details:", error);
    }
}

fetchCountries();

// Function to show the modal with country details
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

// Get the modal and close button
const modal = document.getElementById("countryModal");
const closeButton = document.querySelector(".modal .close");

// When the user clicks on <span> (x), close the modal
closeButton.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

