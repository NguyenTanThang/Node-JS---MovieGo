var express = require('express');
var router = express.Router();
const {
    getAllCustomers,
    getCustomerByID,
    addCustomer,
    editCustomer,
    deleteCustomer
} = require("../controllers/customerController");

router.get('/', getAllCustomers);

router.get('/customerID/:id', getCustomerByID);

router.post('/add', addCustomer);

router.put('/edit/:id', editCustomer);

router.delete('/delete/:id', deleteCustomer);

module.exports = router;
