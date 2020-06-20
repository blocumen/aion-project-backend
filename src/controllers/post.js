const _ = require("lodash");
const async = require("async");

const User = require("../models/user");
const Post = require("../models/post");
const Rating = require("../models/rating");


module.exports = {
 createPost : async (req,res) => {
   try{
       if(req.body){
           
        let postData = await new Post(req.body);
        postData.userId =  req.user._id;
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
 },
getAllPosts : async (req,res) => {
   try{
      let allPost = await Post.find({});
      return res.json({
          status : true,
          posts :  allPost
      })
   }catch(err){
       return res.json({
           status : false,
           error : err
       })
   }
},
 userById : async (req,res) =>{
     User.findById(id).exec((err,user) => {
         if(err || !user){
             return res.status(400).json({
                 error :  "User not found"
             })
         }
         req.user  = user;
         req.session.user = user;
     })
 },
 getUser : async(req,res)=> {
     return res.json(req.user);
 },
 giveRating : async (req,res) => {
     try{
         let ratingData = await new Rating(req.body);
         ratingData.ratedBy =  req.user._id;
         let saveRating = ratingData.save();
         if(ratingData){
             res.json({
                 status : true,
                 rating :  saveRating
             })
         }
     }catch(err){
          res.json({
              status : false,
              error  : err
          })
     }
 } 
 
};