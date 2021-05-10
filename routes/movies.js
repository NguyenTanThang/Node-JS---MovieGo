var express = require('express');
var router = express.Router();
const {
    getAllMovies,
    getMovieByID,
    addMovie,
    editMovie,
    deleteMovie,
    getAllMoviesForRecommendation,
    reformAllMovies
} = require("../controllers/movieController");

router.get('/', getAllMovies);

router.get("/reform", reformAllMovies);

router.get('/rec', getAllMoviesForRecommendation);

router.get('/movieID/:id', getMovieByID);

router.post('/add', addMovie);

router.put('/edit/:id', editMovie);

router.delete('/delete/:id', deleteMovie);

module.exports = router;
