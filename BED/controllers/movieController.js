const Movies = require('../models/Movie'); 

const getAllMovies = async (req, res) => {
    try {
        const movies = await Movies.getAllMovies();
        res.json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving movies");
    }
};

const getMovieById = async (req, res) => {
    const movieId = parseInt(req.params.id);
    console.log(`Fetching movie with ID: ${movieId}`);
    if (isNaN(movieId)) {
        console.log(`Invalid movie ID: ${req.params.id}`);
        return res.status(400).send("Invalid movie ID");
    }
    try {
        const movie = await Movies.getMovieById(movieId);
        if (!movie) {
            console.log(`Movie with ID: ${movieId} not found`);
            return res.status(404).send("Movie not found");
        }
        console.log(`Movie found: ${JSON.stringify(movie)}`);
        res.json(movie);
    } catch (error) {
        console.error('Error retrieving movie:', error);
        res.status(500).send("Error retrieving movie");
    }
};


const getFirstSixMovies = async (req, res) => {
    try {
        const movies = await Movies.getFirstSixMovies();
        res.json(movies);
    } catch (error) {
        console.error('Error retrieving first six movies:', error);
        res.status(500).send("Error retrieving first six movies");
    }
};

module.exports = {
    getAllMovies,
    getMovieById,
    getFirstSixMovies
};
