const Movie = require('../models/Movie'); 

class MovieController {
    static async getAllMovies(req, res) {
        try {
            const movies = await Movie.getAllMovies();
            res.json(movies);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async getMovieById(req, res) {
        try {
            const movie = await Movie.getMovieById(req.params.id);
            if (movie) {
                res.json(movie);
            } else {
                res.status(404).send('Movie not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

module.exports = MovieController;
