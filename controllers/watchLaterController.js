const WatchLater = require("../models/WatchLater");
const {nullHandlersMany} = require("../utils/validation");
const ROUTE_NAME = "watch later item";
const A_OR_AN = "a";

const getAllWatchLaters = async (req, res) => {
    try {
        const watchLaters = await WatchLater.find();

        return res.json({
            status: 200,
            data: {
                watchLaters
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

const getAllWatchLatersByCustomerID = async (req, res) => {
    try {
        const {customerID} = req.params;
        const watchLaters = await WatchLater.find({
            customerID
        });

        return res.json({
            status: 200,
            data: {
                watchLaters
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

const getWatchLaterByID = async (req, res) => {
    try {
        const {id} = req.params;
        const watchLater = await WatchLater.findById(id);

        if (!watchLater) {
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
                watchLater
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

const addWatchLater = async (req, res) => {
    try {
        const {
            customerID,
            movieID
        } = req.body;

        const nullChecker = nullHandlersMany([
            [customerID, "customerID cannot be null"],
            [movieID, "movieID cannot be null"],
        ])

        if (nullChecker) {
            return res.json({
                status: 400,
                data: null,
                success: false,
                message: nullChecker
            }) 
        }

        const watchLater = await new WatchLater({
            customerID,
            movieID,
            created_date: Date.now(),
            last_modified_date: Date.now()
        })

        return res.json({
            status: 200,
            data: {
                watchLater
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

/*
const editWatchLater = async (req, res) => {
    try {
        const {id} = req.params;
        const watchLater = await WatchLater.findById(id);

        if (!watchLater) {
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
*/

const deleteWatchLater = async (req, res) => {
    try {
        const {id} = req.params;
        const watchLater = await WatchLater.findById(id);

        if (!watchLater) {
            return res.json({
                status: 200,
                data: null,
                success: true,
                message: "There is no record which matches the ID"
            })
        }

        const deletedWatchLater = await WatchLater.findByIdAndDelete(id);

        return res.json({
            status: 200,
            data: {
                deletedWatchLater
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
    getAllWatchLaters,
    getAllWatchLatersByCustomerID,
    getWatchLaterByID,
    addWatchLater,
    deleteWatchLater
}