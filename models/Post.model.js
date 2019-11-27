const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const PostSchema = new Schema({
  pseudo: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  like: {
    type: Array
  },
  comment: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
