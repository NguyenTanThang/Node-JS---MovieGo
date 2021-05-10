const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema({
    movieID: {
        type: String,
        required: true
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

module.exports = mongoose.model("views", modelSchema);