// Event listener for when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    
    // Function to fetch movies from the server
    async function fetchMovies() {
        try {
            // Make a GET request to fetch movies
            const response = await fetch("http://localhost:3000/movies");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse the response as JSON
            const movies = await response.json();
            // Get all select elements with the name 'movie-id'
            const movieSelects = document.querySelectorAll('select[name="movie-id"]');

            // Populate each select element with movie options
            movieSelects.forEach(select => {
                movies.forEach(movie => {
                    const option = document.createElement('option');
                    option.value = movie.ID;
                    option.textContent = `${movie.ID} - ${movie.Name}`;
                    select.appendChild(option);
                });
            });
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    // Function to fetch countries from the server
    async function fetchCountries() {
        try {
            // Make a GET request to fetch countries
            const response = await fetch("http://localhost:3000/countries");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse the response as JSON
            const countries = await response.json();
            // Get all select elements with the name 'country-id' or 'country'
            const countrySelects = document.querySelectorAll('select[name="country-id"], select[name="country"]');

            // Populate each select element with country options
            countrySelects.forEach(select => {
                countries.forEach(country => {
                    const option = document.createElement('option');
                    option.value = country.ID;
                    option.textContent = `${country.ID} - ${country.CountryName}`;
                    select.appendChild(option);
                });
            });
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    }

    // Check if specific forms are present in the document and fetch initial data
    if (document.getElementById('update-movie-form') || document.getElementById('delete-movie-form') || document.getElementById('add-movie-form')) {
        fetchMovies();
        fetchCountries();
    }

    // Event listener for the movie update form submission
    document.getElementById('update-movie-form')?.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get the movie ID from the select element
        const movieId = document.getElementById('movie-id').value;
        const updates = {};

        // Get form values and populate the updates object
        const name = document.getElementById('movie-name').value;
        const year = document.getElementById('movie-year').value;
        const director = document.getElementById('movie-director').value;
        const country = document.getElementById('movie-country').value;
        const description = document.getElementById('movie-description').value;
        const trailerUrl = document.getElementById('movie-trailer-url').value;

        if (name) updates.Name = name;
        if (year) updates.Published_Year = year;
        if (director) updates.Director = director;
        if (country) updates.Country = country;
        if (description) updates.Description = description;
        if (trailerUrl) updates.TrailerUrl = trailerUrl;

        try {
            // Make a PUT request to update the movie
            const response = await fetch(`http://localhost:3000/movies/${movieId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
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

    // Event listener for the country update form submission
    document.getElementById('update-country-form')?.addEventListener('submit', async function (e) {
        e.preventDefault();
        // Get the country ID from the select element
        const countryId = document.getElementById('country-id').value;
        const countryData = {
            CountryName: document.getElementById('country-name').value,
            Description: document.getElementById('country-description').value
        };

        try {
            // Make a PUT request to update the country
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

    // Event listener for the add movie form submission
    document.getElementById('add-movie-form')?.addEventListener('submit', async function (e) {
        e.preventDefault();
        // Create a new FormData object from the form
        const formData = new FormData(this);

        try {
            // Make a POST request to add a new movie
            const response = await fetch('http://localhost:3000/movies/add', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Movie added successfully');
            } else {
                alert('Failed to add movie');
            }
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    });

    // Event listener for the delete movie form submission
    document.getElementById('delete-movie-form')?.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get the movie ID from the select element
        const movieId = document.getElementById('movie-id').value;

        try {
            // Make a DELETE request to remove the movie
            const response = await fetch(`http://localhost:3000/movies/${movieId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Movie deleted successfully');
                location.reload(); // Reload the page to update the movie list
            } else {
                alert('Failed to delete movie');
            }
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    });

    // Event listener for the delete admin form submission
    document.getElementById('delete-admin')?.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('admin-email').value;

        try {
            const response = await fetch(`http://localhost:3000/admins/delete/${email}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Admin deleted successfully');
                window.location.href = 'adminpage.html'; // Redirect to admin page
            } else {
                alert('Failed to delete admin');
            }
        } catch (error) {
            console.error('Error deleting admin:', error);
        }
    });
});
