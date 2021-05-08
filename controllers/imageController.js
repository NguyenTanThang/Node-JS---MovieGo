const Image = require("../models/Image");
const {nullHandlersMany} = require("../utils/validation");
const ROUTE_NAME = "image";
const A_OR_AN = "an";

const getAllImages = async (req, res) => {
    try {
        const images = await Image.find();

        return res.json({
            status: 200,
            data: {
                images
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

const getImageByID = async (req, res) => {
    try {
        const {id} = req.params;
        const image = await Image.findById(id);

        if (!image) {
            return res.json({
                status: 200,
                data: null,
                success: true,
                message: "There is no record which matches the ID"
            })
        }

        return res.json({
            status: 200,
            data: {
                image
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

const addImage = async (req, res) => {
    try {
        const {
            tags,
            imageURL
        } = req.body;

        const nullChecker = nullHandlersMany([
            [tags, "tags cannot be null"],
            [imageURL, "imageURL cannot be null"],
        ])

        if (nullChecker) {
            return res.json({
                status: 400,
                data: null,
                success: false,
                message: nullChecker
            }) 
        }

        const image = await new Image({
            tags,
            imageURL,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();

        return res.json({
            status: 200,
            data: {
                image
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

const editImage = async (req, res) => {
    try {
        const {id} = req.params;
        const image = await Image.findById(id);

        if (!image) {
            return res.json({
                status: 200,
                data: null,
                success: true,
                message: "There is no record which matches the ID"
            })
        }

        const {
            tags,
            imageURL
        } = req.body;

        const nullChecker = nullHandlersMany([
            [tags, "tags cannot be null"],
            [imageURL, "imageURL cannot be null"],
        ])

        if (nullChecker) {
            return res.json({
                status: 400,
                data: null,
                success: false,
                message: nullChecker
            }) 
        }

        let updatedImage = await Image.findByIdAndUpdate(id ,{
            tags,
            imageURL,
            created_date: Date.now(),
            last_modified_date: Date.now()
        })
        updatedImage = await Image.findById(id);

        return res.json({
            status: 200,
            data: {
                updatedImage
            },
            success: true,
            message: `Successfully updated ${A_OR_AN} ${ROUTE_NAME}`
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

const deleteImage = async (req, res) => {
    try {
        const {id} = req.params;
        const image = await Image.findById(id);

        if (!image) {
            return res.json({
                status: 200,
                data: null,
                success: true,
                message: "There is no record which matches the ID"
            })
        }

        const deletedImage = await Image.findByIdAndDelete(id);

        return res.json({
            status: 200,
            data: {
                deletedImage
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
    getAllImages,
    getImageByID,
    addImage,
    editImage,
    deleteImage
}