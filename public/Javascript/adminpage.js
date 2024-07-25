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
        const formData = new FormData();
        formData.append('movie-id', document.getElementById('movie-id').value);
        formData.append('Name', document.getElementById('movie-name').value);
        formData.append('Published_Year', document.getElementById('movie-year').value);
        formData.append('Director', document.getElementById('movie-director').value);
        formData.append('Country', document.getElementById('movie-country').value);
        formData.append('Description', document.getElementById('movie-description').value);
        formData.append('TrailerUrl', document.getElementById('movie-trailer-url').value);

        const movieId = document.getElementById('movie-id').value;

        try {
            const response = await fetch(`http://localhost:3000/movies/${movieId}`, {
                method: 'PUT',
                body: formData
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
        const countryData = {
            CountryName: document.getElementById('country-name').value,
            Description: document.getElementById('country-description').value
        };

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
