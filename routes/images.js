var express = require('express');
var router = express.Router();
const {
    getAllImages,
    getImageByID,
    addImage,
    editImage,
    deleteImage
} = require("../controllers/imageController");

router.get('/', getAllImages);

router.get('/imageID/:id', getImageByID);

router.post('/add', addImage);

router.put('/edit/:id', editImage);

router.delete('/delete/:id', deleteImage);

module.exports = router;
