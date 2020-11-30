const express = require("express");

const authController = require("../controllers/auth");
const tweetController = require("../controllers/tweet");

const router = express.Router();

router.post("/userSignUp", authController.signup);
router.post('/userSignin', authController.signin);
router.post('/tweetUrl',tweetController.createTweet);



module.exports = router;
