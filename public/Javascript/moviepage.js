async function fetchMovies() {
    try {
        const response = await fetch("http://localhost:3000/movies"); // Your API endpoint
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const movieList = document.getElementById("movie-list");

        data.forEach((movie) => {
            const movieItem = document.createElement("div");
            movieItem.classList.add("movie"); // Add a CSS class for styling

            // Create elements for movie details and populate with movie data
            const titleElement = document.createElement("h2");
            titleElement.textContent = movie.Name;

            const yearElement = document.createElement("p");
            yearElement.textContent = `Published Year: ${movie.Published_Year}`;

            const directorElement = document.createElement("p");
            directorElement.textContent = `Director: ${movie.Director}`;

            const countryElement = document.createElement("p");
            countryElement.textContent = `Country: ${movie.Country}`;

            // Append elements to the movie item
            movieItem.appendChild(titleElement);
            movieItem.appendChild(yearElement);
            movieItem.appendChild(directorElement);
            movieItem.appendChild(countryElement);

            // Append movie item to the movie list
            movieList.appendChild(movieItem);
        });
    } catch (error) {
        console.error("Error fetching movie details:", error);
    }
}

fetchMovies(); // Call the function to fetch and display movie data
