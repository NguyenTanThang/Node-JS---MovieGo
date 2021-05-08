const Customer = require("../models/Customer");
const {nullHandlersMany} = require("../utils/validation");
const {encrypt, compare} = require("../utils/encryption");
const ROUTE_NAME = "customer";
const A_OR_AN = "a";

const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();

        return res.json({
            status: 200,
            data: {
                customers
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

const getCustomerByID = async (req, res) => {
    try {
        const {id} = req.params;
        const customer = await Customer.findById(id);

        if (!customer) {
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
                customer
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

const addCustomer = async (req, res) => {
    try {
        let {
            username,
            email,
            password,
            status
        } = req.body;

        const nullChecker = nullHandlersMany([
            [username, "username cannot be null"],
            [email, "email cannot be null"],
            [password, "password cannot be null"],
        ])

        if (nullChecker) {
            return res.json({
                status: 400,
                data: null,
                success: false,
                message: nullChecker
            }) 
        }

        password = encrypt(password);

        const customer = await new Customer({
            username,
            email,
            password,
            status,
            created_date: Date.now(),
            last_modified_date: Date.now()
        })

        return res.json({
            status: 200,
            data: {
                customer
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

const editCustomer = async (req, res) => {
    try {
        const {id} = req.params;
        const customer = await Customer.findById(id);

        if (!customer) {
            return res.json({
                status: 200,
                data: null,
                success: true,
                message: "There is no record which matches the ID"
            })
        }

        let {
            username,
            email,
            password,
            status
        } = req.body;

        const nullChecker = nullHandlersMany([
            [username, "username cannot be null"],
            [email, "email cannot be null"],
            [password, "password cannot be null"],
        ])

        if (nullChecker) {
            return res.json({
                status: 400,
                data: null,
                success: false,
                message: nullChecker
            }) 
        }

        let updateDetails = {
            username,
            email,
            status
        }

        if (password) {
            password = encrypt(password);
            updateDetails = {
                ...updateDetails,
                password
            }
        }

        let updatedCustomer = await Customer.findByIdAndUpdate(id ,{
            ...updateDetails,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();
        updatedCustomer = await Customer.findById(id);

        return res.json({
            status: 200,
            data: {
                updatedCustomer
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

const deleteCustomer = async (req, res) => {
    try {
        const {id} = req.params;
        const customer = await Customer.findById(id);

        if (!customer) {
            return res.json({
                status: 200,
                data: null,
                success: true,
                message: "There is no record which matches the ID"
            })
        }

        const deletedCustomer = await Customer.findByIdAndDelete(id);

        return res.json({
            status: 200,
            data: {
                deletedCustomer
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
    getAllCustomers,
    getCustomerByID,
    addCustomer,
    editCustomer,
    deleteCustomer
}