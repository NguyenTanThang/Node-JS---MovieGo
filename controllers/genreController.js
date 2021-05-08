const Genre = require("../models/Genre");
const {nullHandlersMany} = require("../utils/validation");
const ROUTE_NAME = "genre";
const A_OR_AN = "a";

const getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find();

        return res.json({
            status: 200,
            data: {
                genres
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

const getGenreByID = async (req, res) => {
    try {
        const {id} = req.params;
        const genre = await Genre.findById(id);

        if (!genre) {
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
                genre
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

const addGenre = async (req, res) => {
    try {
        const {
            name,
            desc,
            imageURL
        } = req.body;

        const nullChecker = nullHandlersMany([
            [name, "name cannot be null"],
            [desc, "desc cannot be null"],
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

        const genre = await new Genre({
            name,
            desc,
            imageURL,
            created_date: Date.now(),
            last_modified_date: Date.now()
        })

        return res.json({
            status: 200,
            data: {
                genre
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

const editGenre = async (req, res) => {
    try {
        const {id} = req.params;
        const genre = await Genre.findById(id);

        if (!genre) {
            return res.json({
                status: 200,
                data: null,
                success: true,
                message: "There is no record which matches the ID"
            })
        }

        const {
            name,
            desc,
            imageURL
        } = req.body;

        const nullChecker = nullHandlersMany([
            [name, "name cannot be null"],
            [desc, "desc cannot be null"],
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

        let updatedGenre = await Genre.findByIdAndUpdate(id ,{
            name,
            desc,
            imageURL,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();
        updatedGenre = await Genre.findById(id);

        return res.json({
            status: 200,
            data: {
                updatedGenre
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

const deleteGenre = async (req, res) => {
    try {
        const {id} = req.params;
        const genre = await Genre.findById(id);

        if (!genre) {
            return res.json({
                status: 200,
                data: null,
                success: true,
                message: "There is no record which matches the ID"
            })
        }

        const deletedGenre = await Genre.findByIdAndDelete(id);

        return res.json({
            status: 200,
            data: {
                deletedGenre
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
    getAllGenres,
    getGenreByID,
    addGenre,
    editGenre,
    deleteGenre
}