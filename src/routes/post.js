const express = require("express");

const postController = require("../controllers/post");
const { requireSignin } = require('../controllers/auth');

const router = express.Router();

router.post("/createPost" ,requireSignin, postController.createPost);
router.post("/createPostTweet" , postController.createTweetPost);
router.get("/getUser",requireSignin,postController.getUser);
router.post("/giveRating",requireSignin,postController.giveRating);
router.get("/getAllPosts",postController.getAllPosts);




module.exports = router;
