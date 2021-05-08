const Rate = require("../models/Rate");
const {nullHandlersMany} = require("../utils/validation");
const ROUTE_NAME = "rate";
const A_OR_AN = "a";

const getAllRates = async (req, res) => {
    try {
        const rates = await Rate.find();

        return res.json({
            status: 200,
            data: {
                rates
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

const getRateByID = async (req, res) => {
    try {
        const {id} = req.params;
        const rate = await Rate.findById(id);

        if (!rate) {
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
                rate
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

const getRateByCustomerIDAndMovieID = async (req, res) => {
    try {
        const {customerID, movieID} = req.params;
        const rate = await Rate.findOne({customerID, movieID});

        if (!rate) {
            return res.json({
                status: 200,
                data: null,
                success: true,
                message: "There is no record which matches the criteria"
            })
        }

        return res.json({
            status: 200,
            data: {
                rate
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

const getAllRatesByMovieID = async (req, res) => {
    try {
        const {movieID} = req.params;
        const rates = await Rate.find({movieID});

        return res.json({
            status: 200,
            data: {
                rates
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

const addRate = async (req, res) => {
    try {
        const {
            movieID,
            customerID,
            rate
        } = req.body;

        const nullChecker = nullHandlersMany([
            [movieID, "movieID cannot be null"],
            [customerID, "customerID cannot be null"],
            [rate, "rate cannot be null"],
        ])

        if (nullChecker) {
            return res.json({
                status: 400,
                data: null,
                success: false,
                message: nullChecker
            }) 
        }

        const newRate = await new Rate({
            movieID,
            customerID,
            rate,
            created_date: Date.now(),
            last_modified_date: Date.now()
        })

        return res.json({
            status: 200,
            data: {
                rate: newRate
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

const editRate = async (req, res) => {
    try {
        const {id} = req.params;
        const existedRate = await Rate.findById(id);

        if (!existedRate) {
            return res.json({
                status: 200,
                data: null,
                success: true,
                message: "There is no record which matches the ID"
            })
        }

        const {
            movieID,
            customerID,
            rate
        } = req.body;

        const nullChecker = nullHandlersMany([
            [movieID, "movieID cannot be null"],
            [customerID, "customerID cannot be null"],
            [rate, "rate cannot be null"],
        ])

        if (nullChecker) {
            return res.json({
                status: 400,
                data: null,
                success: false,
                message: nullChecker
            }) 
        }

        let updatedRate = await Rate.findByIdAndUpdate(id ,{
            movieID,
            customerID,
            rate,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();
        updatedRate = await Rate.findById(id);

        return res.json({
            status: 200,
            data: {
                updatedRate
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

const deleteRate = async (req, res) => {
    try {
        const {id} = req.params;
        const rate = await Rate.findById(id);

        if (!rate) {
            return res.json({
                status: 200,
                data: null,
                success: true,
                message: "There is no record which matches the ID"
            })
        }

        const deletedRate = await Rate.findByIdAndDelete(id);

        return res.json({
            status: 200,
            data: {
                deletedRate
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
    getAllRates,
    getRateByID,
    getRateByCustomerIDAndMovieID,
    getAllRatesByMovieID,
    addRate,
    editRate,
    deleteRate,
}