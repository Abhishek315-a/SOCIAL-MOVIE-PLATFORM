const express = require("express");
const {
  createTweet,
  deleteTweet,
  likeOrDislike,
  getAllTweet,
  getFollowingTweet,
} = require("../controller/tweetController.js");
const verifyToken = require("../middleware/VerifyToken");

const router = express.Router();

router.post("/create", verifyToken, createTweet);
router.delete("/delete/:id", verifyToken, deleteTweet);
router.put("/like/:id", verifyToken, likeOrDislike);
router.get("/getalltweet/:id", verifyToken, getAllTweet);
router.get("/getfollowingtweet/:id", verifyToken, getFollowingTweet);

module.exports = router;
