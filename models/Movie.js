const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    IMDB_ID: {
        type: String,
        required: true
    },
    IMDBOject: {
        type: Object,
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    streamTapeCode: {
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

module.exports = mongoose.model("movies", modelSchema);