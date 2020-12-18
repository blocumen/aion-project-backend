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
  tweetLink : {
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
  result :{
   type : String,
   default: "noStatus"
  }
  // createdAt: {
  //   type: Date,
  //   default: Date.now
  // },

  // updatedAt: {
  //   type: Date,
  //   default: Date.now
  // }
},{
  timestamps : true,
});


module.exports = mongoose.model("Post", postSchema);