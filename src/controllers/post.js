const _ = require("lodash");
const async = require("async");

const User = require("../models/user");
const Post = require("../models/post");
const Rating = require("../models/rating");

module.exports = {
  createTweetPost: async (req, res) => {
    try {
      let obj = JSON.parse(JSON.stringify(req.body));
console.log(obj);
      if (obj.tweetLink) {
        let postData = await new Post(obj);

        postData.userId = "5fd5be37f33b95571a905592";
        let savePostData = await postData.save();

        if (savePostData) {
          res.json({
            status: true,
            post: savePostData,
            message: "post created successfully",
          });
        }
      }
    } catch (err) {
      res.json({
        status: false,
        error: err,
      });
    }
  },
  createPost: async (req, res) => {
    try {
      let obj = JSON.parse(JSON.stringify(req.body));

      if (obj.postContent) {
        let postData = await new Post(obj);

        if (req.user._id) postData.userId = req.user._id;

        let savePostData = await postData.save();
        if (savePostData) {
          res.json({
            status: true,
            post: savePostData,
            message: "post created successfully",
          });
        }
      }
    } catch (err) {
      res.json({
        status: false,
        error: err,
      });
    }
  },
  getAllPosts: async (req, res) => {
    try {
      let allPost = await Post.find({})
        .sort({ $natural: -1 })
        .populate("ratings");

      return res.json({
        status: true,
        posts: allPost,
      });
    } catch (err) {
      return res.json({
        status: false,
        error: err,
      });
    }
  },
  userById: async (req, res) => {
    User.findById(id).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User not found",
        });
      }

      req.user = user;
      req.session.user = user;
    });
  },
  getUser: async (req, res) => {
    let user = await User.findById({ _id: req.user._id });

    return res.json(user);
  },
  giveRating: async (req, res) => {
    try {
      console.log(req.body);
      // let ratings = await Rating.findOne({postId : req.body.postId});
      // console.log(ratings);
      // ratings.forEach((item) => {
      //   if(item.ratedBy == req.user._id){
      //     return res.json({
      //       status :  false,
      //       message : "You can't rate this post a you have done earlier"
      //     })
      //   }
      // })
      let ratingData = await new Rating(req.body);
      console.log("ratingData : ", ratingData);
      ratingData.ratedBy = req.user._id;
      console.log("saving data");
      let saveRating = await ratingData.save();
      console.log("saving data done");
      if (saveRating) {
        console.log("saveRating : ", saveRating);
        var postUpdate = await Post.findOneAndUpdate(
          { _id: req.body.postId },
          { $push: { ratings: saveRating._id } }
        );
        console.log("save rating data : done");
      }

      if (saveRating && postUpdate) {
        res.json({
          status: true,
          rating: saveRating,
        });
      }
    } catch (err) {
      res.status(400).json({
        status: false,
        error: err,
      });
    }
  },
};
