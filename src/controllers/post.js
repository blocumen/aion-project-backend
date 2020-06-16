const _ = require("lodash");
const async = require("async");

const User = require("../models/user");
const Post = require("../models/post");


module.exports = {
 createPost : async (req,res) => {
   try{
       if(req.body){
        let postData = await new Post(req.body);
        let savePostData = await postData.save();
        if(savePostData){
            res.json({
                status : true,
                post : savePostData,
                message : 'post created successfully'
            })
        }
       }
   }catch(err){
       res.json({
          status : false,
          error : err
       })
   }
 } 
 
};