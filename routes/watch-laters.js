var express = require('express');
var router = express.Router();
const {
    getAllWatchLaters,
    getAllWatchLatersByCustomerID,
    getWatchLaterByID,
    addWatchLater,
    deleteWatchLater,
    getAllWatchLatersByCustomerIDAndMovieID
} = require("../controllers/watchLaterController");

router.get('/', getAllWatchLaters);

router.get('/watchLaterID/:id', getWatchLaterByID);

router.get('/customerID/:customerID', getAllWatchLatersByCustomerID);

router.get('/customerID/:customerID/movieID/:movieID', getAllWatchLatersByCustomerIDAndMovieID);

router.post('/add', addWatchLater);

router.delete('/delete/:id', deleteWatchLater);

module.exports = router;
