const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model("Tour", TourSchema);