const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  tourIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tours'
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);