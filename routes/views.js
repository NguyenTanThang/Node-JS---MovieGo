var express = require('express');
var router = express.Router();
const {
    getAllViews,
    getAllViewsByMovieID,
    getAllViewsByCustomerID,
    getViewByID,
    deleteView,
    addView
} = require("../controllers/viewController");

router.get('/', getAllViews);

router.get('/genreID/:id', getViewByID);

router.get('/movieID/:id', getAllViewsByMovieID);

router.get('/customerID/:id', getAllViewsByCustomerID);

router.post('/add', addView);

router.delete('/delete/:id', deleteView);

module.exports = router;
