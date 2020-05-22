const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TourSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    place: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Tour", TourSchema);