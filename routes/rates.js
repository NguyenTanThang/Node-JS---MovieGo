var express = require('express');
var router = express.Router();
const {
    getAllRates,
    getRateByID,
    getRateByCustomerIDAndMovieID,
    getAllRatesByMovieID,
    addRate,
    editRate,
    deleteRate,
} = require("../controllers/rateController");

router.get('/', getAllRates);

router.get('/genreID/:id', getRateByID);

router.get('/movieID/:movieID', getAllRatesByMovieID);

router.get('/movieID/:movieID/customerID/:customerID', getRateByCustomerIDAndMovieID);

router.post('/add', addRate);

router.put('/edit/:id', editRate);

router.delete('/delete/:id', deleteRate);

module.exports = router;
