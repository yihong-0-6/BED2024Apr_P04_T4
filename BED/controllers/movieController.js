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
    const movieId = parseInt(req.params.ID);
    try {
        const movie = await Movie.getMovieById(movieId);
        if (!movie) {
            return res.status(404).send("Movie not found");
        } 
        res.json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving movie");
    }
};

module.exports = {
    getAllMovies,
    getMovieById,
};