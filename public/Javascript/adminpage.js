document.addEventListener("DOMContentLoaded", function () {
    async function fetchMovies() {
        try {
            const response = await fetch("http://localhost:3000/movies");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const movies = await response.json();
            const movieSelect = document.getElementById('movie-id');

            movies.forEach(movie => {
                const option = document.createElement('option');
                option.value = movie.ID;
                option.textContent = `${movie.ID} - ${movie.Name}`;
                movieSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    fetchMovies();

    document.getElementById('update-movie-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const movieId = document.getElementById('movie-id').value;
        const updateData = {};

        const name = document.getElementById('movie-name').value;
        if (name) updateData.Name = name;

        const year = document.getElementById('movie-year').value;
        if (year) updateData.Published_Year = year;

        const director = document.getElementById('movie-director').value;
        if (director) updateData.Director = director;

        const country = document.getElementById('movie-country').value;
        if (country) updateData.Country = country;

        const description = document.getElementById('movie-description').value;
        if (description) updateData.Description = description;

        const trailerUrl = document.getElementById('movie-trailer-url').value;
        if (trailerUrl) updateData.TrailerUrl = trailerUrl;

        try {
            const response = await fetch(`http://localhost:3000/movies/${movieId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                alert('Movie updated successfully');
            } else {
                alert('Failed to update movie');
            }
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    });

    document.getElementById('update-country-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const countryId = document.getElementById('country-id').value;
        const countryData = {};

        const countryName = document.getElementById('country-name').value;
        if (countryName) countryData.CountryName = countryName;

        const description = document.getElementById('country-description').value;
        if (description) countryData.Description = description;

        try {
            const response = await fetch(`http://localhost:3000/countries/${countryId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(countryData)
            });

            if (response.ok) {
                alert('Country updated successfully');
            } else {
                alert('Failed to update country');
            }
        } catch (error) {
            console.error('Error updating country:', error);
        }
    });
});
