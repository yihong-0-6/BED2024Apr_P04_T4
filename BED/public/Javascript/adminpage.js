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

    async function fetchCountries() {
        try {
            const response = await fetch("http://localhost:3000/countries");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const countries = await response.json();
            const countrySelect = document.getElementById('movie-country') || document.getElementById('country-id');

            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.ID;
                option.textContent = `${country.ID} - ${country.CountryName}`;
                countrySelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    }

    if (document.getElementById('update-movie-form')) {
        fetchMovies();
        fetchCountries();
    }

    if (document.getElementById('update-country-form')) {
        fetchCountries();
    }

    document.getElementById('update-movie-form')?.addEventListener('submit', async function (e) {
        e.preventDefault();

        const movieId = document.getElementById('movie-id').value;
        const updates = {};

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

    document.getElementById('update-country-form')?.addEventListener('submit', async function (e) {
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

    document.getElementById('add-movie-form')?.addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = new FormData(this);

        try {
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

    document.addEventListener("DOMContentLoaded", function () {
        async function fetchMovies() {
            try {
                const response = await fetch("http://localhost:3000/movies");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const movies = await response.json();
                const movieSelects = document.querySelectorAll('select[name="movie-id"]');
    
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
    
        async function fetchCountries() {
            try {
                const response = await fetch("http://localhost:3000/countries");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const countries = await response.json();
                const countrySelects = document.querySelectorAll('select[name="country-id"], select[name="country"]');
    
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
    
        if (document.getElementById('update-movie-form') || document.getElementById('delete-movie-form')) {
            fetchMovies();
            fetchCountries();
        }
    
        document.getElementById('delete-movie-form')?.addEventListener('submit', async function (e) {
            e.preventDefault();
    
            const movieId = document.getElementById('delete-movie-id').value;
    
            try {
                const response = await fetch(`http://localhost:3000/movies/${movieId}`, {
                    method: 'DELETE'
                });
    
                if (response.ok) {
                    alert('Movie deleted successfully');
                    location.reload();
                } else {
                    alert('Failed to delete movie');
                }
            } catch (error) {
                console.error('Error deleting movie:', error);
            }
        });
    
    });

    
});
