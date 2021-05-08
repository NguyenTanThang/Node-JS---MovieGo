var express = require('express');
var router = express.Router();
const {
    getAllWatchLaters,
    getAllWatchLatersByCustomerID,
    getWatchLaterByID,
    addWatchLater,
    deleteWatchLater
} = require("../controllers/watchLaterController");

router.get('/', getAllWatchLaters);

router.get('/genreID/:id', getWatchLaterByID);

router.get('/customerID/:id', getAllWatchLatersByCustomerID);

router.post('/add', addWatchLater);

router.delete('/delete/:id', deleteWatchLater);

module.exports = router;
