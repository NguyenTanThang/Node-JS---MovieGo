const View = require("../models/View");
const {nullHandlersMany} = require("../utils/validation");
const ROUTE_NAME = "view";
const A_OR_AN = "a";

const getAllViews = async (req, res) => {
    try {
        const views = await View.find();

        return res.json({
            status: 200,
            data: {
                views
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

const getAllViewsByCustomerID = async (req, res) => {
    try {
        const {customerID} = req.params;
        const views = await View.find({
            customerID
        });

        return res.json({
            status: 200,
            data: {
                views
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

const getAllViewsByMovieID = async (req, res) => {
    try {
        const {movieID} = req.params;
        const views = await View.find({
            movieID
        });

        return res.json({
            status: 200,
            data: {
                views
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

const getViewByID = async (req, res) => {
    try {
        const {id} = req.params;
        const view = await View.findById(id);

        if (!view) {
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
                view
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

const addView = async (req, res) => {
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

        const view = await new View({
            customerID,
            movieID,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save()

        return res.json({
            status: 200,
            data: {
                view
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

const deleteView = async (req, res) => {
    try {
        const {id} = req.params;
        const view = await View.findById(id);

        if (!view) {
            return res.json({
                status: 200,
                data: null,
                success: true,
                message: "There is no record which matches the ID"
            })
        }

        const deletedView = await View.findByIdAndDelete(id);

        return res.json({
            status: 200,
            data: {
                deletedView
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
    getAllViews,
    getAllViewsByMovieID,
    getAllViewsByCustomerID,
    getViewByID,
    deleteView,
    addView
}