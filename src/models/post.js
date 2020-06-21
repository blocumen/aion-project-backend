const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema;


const postSchema = new mongoose.Schema({
  
  userId: {
    type: ObjectId,
    ref: "User"
  },
  
  postContent : {
      type : String,
      default : null
  },
  ratings : [{
    type : ObjectId,
    ref  : "Rating"
  }],
  status: {
    type: String,
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model("Post", postSchema);