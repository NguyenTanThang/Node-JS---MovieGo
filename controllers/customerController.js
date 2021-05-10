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
        }).save()

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

const signUp = async (req, res) => {
    try {
        let {
            username,
            email,
            password,
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

        let customer = await Customer.findOne({
            email,
        });

        if (customer) {
            return res.json({
                status: 400,
                data: null,
                success: false,
                message: "Please enter a valid email"
            }) 
        }

        password = encrypt(password);

        customer = await new Customer({
            username,
            email,
            password,
            status: true,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();

        return res.json({
            status: 200,
            data: {
                customer
            },
            success: true,
            message: `Successfully signed up`
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

const updateProfile = async (req, res) => {
    try {
        const {customerID} = req.params;
        let {
            username,
            password,
        } = req.body;

        const nullChecker = nullHandlersMany([
            [username, "username cannot be null"],
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

        let customer = await Customer.findById(customerID);

        if (!customer) {
            return res.json({
                status: 400,
                data: null,
                success: false,
                message: "There is no record which matches the ID"
            }) 
        }

        password = encrypt(password);

        customer = await Customer.findByIdAndUpdate(customerID, {
            username,
            password,
            last_modified_date: Date.now()
        })

        return res.json({
            status: 200,
            data: {
                customer
            },
            success: true,
            message: `Successfully updated your profile`
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

const signIn = async (req, res) => {
    try {
        let {
            email,
            password,
        } = req.body;

        const nullChecker = nullHandlersMany([
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

        let customer = await Customer.findOne({
            email,
        });

        if (!customer || !compare(password, customer.password)) {
            return res.json({
                status: 400,
                data: null,
                success: false,
                message: "Invalid email or password"
            }) 
        }

        return res.json({
            status: 200,
            data: {
                customer
            },
            success: true,
            message: `Successfully signed in`
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
    deleteCustomer,
    signUp,
    signIn,
    updateProfile
}