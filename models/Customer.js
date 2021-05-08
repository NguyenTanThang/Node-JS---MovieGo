const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now()
    },
    last_modified_date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("customers", modelSchema);