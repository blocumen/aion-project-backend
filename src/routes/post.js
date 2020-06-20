const express = require("express");

const postController = require("../controllers/post");
const { requireSignin } = require('../controllers/auth');

const router = express.Router();

router.post("/createPost" ,requireSignin, postController.createPost);
router.get("/getUser",postController.getUser);




module.exports = router;
