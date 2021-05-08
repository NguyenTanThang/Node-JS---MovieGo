var express = require('express');
var router = express.Router();
const {
    getAllGenres,
    getGenreByID,
    addGenre,
    editGenre,
    deleteGenre
} = require("../controllers/genreController");

router.get('/', getAllGenres);

router.get('/genreID/:id', getGenreByID);

router.post('/add', addGenre);

router.put('/edit/:id', editGenre);

router.delete('/delete/:id', deleteGenre);

module.exports = router;
