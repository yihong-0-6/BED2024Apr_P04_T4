const Movies = require('../models/Movie'); // Import the Movies model

// Controller function to get all movies
const getAllMovies = async (req, res) => {
    try {
        const movies = await Movies.getAllMovies(); // Fetch all movies from the model
        res.json(movies); // Respond with the movies in JSON format
    } catch (error) {
        console.error(error); // Log any errors to the console
        res.status(500).send("Error retrieving movies"); // Send a 500 status code with an error message
    }
};

// Controller function to get a movie by its ID
const getMovieById = async (req, res) => {
    const movieId = parseInt(req.params.id); // Parse the movie ID from the request parameters
    console.log(`Fetching movie with ID: ${movieId}`); // Log the movie ID being fetched
    if (isNaN(movieId)) {
        console.log(`Invalid movie ID: ${req.params.id}`); // Log if the movie ID is invalid
        return res.status(400).send("Invalid movie ID"); // Send a 400 status code with an error message for invalid ID
    }
    try {
        const movie = await Movies.getMovieById(movieId); // Fetch the movie by ID from the model
        if (!movie) {
            console.log(`Movie with ID: ${movieId} not found`); // Log if the movie is not found
            return res.status(404).send("Movie not found"); // Send a 404 status code with an error message if movie not found
        }
        console.log(`Movie found: ${JSON.stringify(movie)}`); // Log the found movie
        res.json(movie); // Respond with the movie in JSON format
    } catch (error) {
        console.error('Error retrieving movie:', error); // Log any errors to the console
        res.status(500).send("Error retrieving movie"); // Send a 500 status code with an error message
    }
};

// Controller function to get the first six movies
const getFirstSixMovies = async (req, res) => {
    try {
        const movies = await Movies.getFirstSixMovies(); // Fetch the first six movies from the model
        res.json(movies); // Respond with the movies in JSON format
    } catch (error) {
        console.error('Error retrieving first six movies:', error); // Log any errors to the console
        res.status(500).send("Error retrieving first six movies"); // Send a 500 status code with an error message
    }
};

// Export the controller functions
module.exports = {
    getAllMovies,
    getMovieById,
    getFirstSixMovies
};
