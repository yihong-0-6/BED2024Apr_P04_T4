document.addEventListener("DOMContentLoaded", function () {
    // Function to handle movie update form submission
    document.getElementById('update-movie-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const movieId = document.getElementById('movie-id').value;
        const movieData = {
            Name: document.getElementById('movie-name').value,
            Published_Year: document.getElementById('movie-year').value,
            Director: document.getElementById('movie-director').value,
            Country: document.getElementById('movie-country').value,
            Description: document.getElementById('movie-description').value,
            TrailerUrl: document.getElementById('movie-trailer-url').value
        };

        try {
            const response = await fetch(`http://localhost:3000/movies/${movieId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(movieData)
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

    // Function to handle country update form submission
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
