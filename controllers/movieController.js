const Movie = require("../models/Movie");
const {nullHandlersMany} = require("../utils/validation");
const {getOMDBMovie} = require("../requests/omdbRequest");
const ROUTE_NAME = "movie";
const A_OR_AN = "a";

const getAllMovies = async (req, res) => {
    try {
        let movies = await Movie.find();

        /*
        for (let i = 0; i < movies.length; i++) {
            const movie = movies[i];
            const IMDBObject = await getOMDBMovie(movie.IMDB_ID);
            await Movie.findByIdAndUpdate(movie._id, {
                IMDBObject
            });
        }

        movies = await Movie.find();
        */

        return res.json({
            status: 200,
            data: {
                movies
            },
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: "Internal Server Error",
            data: null,
            success: false
        })
    }
}

const getMovieByID = async (req, res) => {
    try {
        const {id} = req.params;
        let movie = await Movie.findById(id);

        if (!movie) {
            return res.json({
                status: 200,
                data: null,
                success: true,
                message: "There is no record which matches the ID"
            })
        }

        const IMDBObject = await getOMDBMovie(movie.IMDB_ID);
        await Movie.findByIdAndUpdate(movie._id, {
            IMDBObject
        });
        movie = await Movie.findById(id);

        return res.json({
            status: 200,
            data: {
                movie
            },
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: "Internal Server Error",
            data: null,
            success: false
        })
    }
}

const addMovie = async (req, res) => {
    try {
        const {
            name,
            IMDB_ID,
            genres,
            imageURL,
            streamTapeCode
        } = req.body;

        const nullChecker = nullHandlersMany([
            [name, "name cannot be null"],
            [IMDB_ID, "desc cannot be null"],
            [genres, "genres cannot be null"],
            [imageURL, "imageURL cannot be null"],
            [streamTapeCode, "streamTapeCode cannot be null"],
        ])

        if (nullChecker) {
            return res.json({
                status: 400,
                data: null,
                success: false,
                message: nullChecker
            }) 
        }

        const IMDBOject = await getOMDBMovie(IMDB_ID);

        const movie = await new Movie({
            name,
            IMDB_ID,
            IMDBOject,
            genres,
            imageURL,
            streamTapeCode,
            rating: 0,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();

        return res.json({
            status: 200,
            data: {
                movie
            },
            success: true,
            message: `Successfully created ${A_OR_AN} ${ROUTE_NAME}`
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: "Internal Server Error",
            data: null,
            success: false
        })
    }
}

const editMovie = async (req, res) => {
    try {
        const {id} = req.params;

        const movie = await Movie.findById(id);

        if (!movie) {
            return res.json({
                status: 200,
                data: null,
                success: true,
                message: "There is no record which matches the ID"
            })
        }

        const {
            name,
            IMDB_ID,
            genres,
            imageURL,
            streamTapeCode
        } = req.body;

        const nullChecker = nullHandlersMany([
            [name, "name cannot be null"],
            [IMDB_ID, "desc cannot be null"],
            [genres, "genres cannot be null"],
            [imageURL, "imageURL cannot be null"],
            [streamTapeCode, "streamTapeCode cannot be null"],
        ])

        if (nullChecker) {
            return res.json({
                status: 400,
                data: null,
                success: false,
                message: nullChecker
            }) 
        }

        const IMDBOject = await getOMDBMovie(IMDB_ID);

        const updatedMovie = await Movie.findByIdAndUpdate(id, {
            name,
            IMDB_ID,
            IMDBOject,
            genres,
            imageURL,
            streamTapeCode,
            created_date: Date.now(),
            last_modified_date: Date.now()
        });

        return res.json({
            status: 200,
            data: {
                updatedMovie
            },
            success: true,
            message: `Successfully created ${A_OR_AN} ${ROUTE_NAME}`
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: "Internal Server Error",
            data: null,
            success: false
        })
    }
}

const deleteMovie = async (req, res) => {
    try {
        const {id} = req.params;
        const movie = await Movie.findById(id);

        if (!movie) {
            return res.json({
                status: 200,
                data: null,
                success: true,
                message: "There is no record which matches the ID"
            })
        }

        const deletedMovie = await Movie.findByIdAndDelete(id);

        return res.json({
            status: 200,
            data: {
                deletedMovie
            },
            success: true,
            message: `Successfully deleted ${A_OR_AN} ${ROUTE_NAME}`
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: "Internal Server Error",
            data: null,
            success: false
        })
    }
}

module.exports = {
    getAllMovies,
    getMovieByID,
    addMovie,
    editMovie,
    deleteMovie
}