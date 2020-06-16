const express = require("express");

const postController = require("../controllers/post");
const { requireSignin } = require('../controllers/auth');

const router = express.Router();

router.post("/createPost" ,requireSignin, postController.createPost);




module.exports = router;
