const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const UserSchema = new Schema({
  pseudo: {
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
  lvl: {
    type: String,
    required: true
  },
  friends: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = User = mongoose.model("users", UserSchema);
