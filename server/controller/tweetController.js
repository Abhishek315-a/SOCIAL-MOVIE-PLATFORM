const TweetModel = require("../models/Tweet.js");
const userModel = require("../models/user.js");

const createTweet = async (req, res) => {
  try {
    const { description, id } = req.body;
    if (!description || !id) {
      return res.status(401).json({
        message: "All fields are required",
        success: false,
      });
    }
    const user = await userModel.findById(id).select("-password");
    const newTweet = new TweetModel({
      description,
      userId: id,
      userDetails:user,
    });
    await newTweet.save();
    return res
      .status(201)
      .json({ success: true, message: "Tweet created Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTweet = await TweetModel.findByIdAndDelete(id); 

    if (!deletedTweet) {
      return res.status(404).json({
        message: "Tweet not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Tweet deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const likeOrDislike = async (req, res) => {
  try {
    const loggedInUser = req.body.id;
    const tweetId = req.params.id;
    const tweet = await TweetModel.findById(tweetId);
    if (tweet.like.includes(loggedInUser)) {
      //dislike
      await TweetModel.findByIdAndUpdate(tweetId, {
        $pull: { like: loggedInUser },
      });
      return res.status(200).json({
        message: "Tweet disliked",
        success: true,
      });
    } else {
      //like
      await TweetModel.findByIdAndUpdate(tweetId, {
        $push: { like: loggedInUser },
      });
      return res.status(200).json({
        message: "Tweet Liked",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
const getAllTweet = async (req, res) => {
  // loggedInUser tweet + following user tweet
  try {
    const id = req.params.id;
    const loggedInUser = await userModel.findById(id);
    const loggedInUserTweet = await TweetModel.find({ userId: id });
    const followingUserTweet = await Promise.all(
      loggedInUser.following.map((otherUserId) => {
        return TweetModel.find({ userId: otherUserId });
      })
    );
    return res.status(200).json({
      success:true,
      tweets: loggedInUserTweet.concat(...followingUserTweet),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
const getFollowingTweet=async(req,res)=>{
  try {
    const id = req.params.id;
    const loggedInUser = await userModel.findById(id);
    const followingUserTweet = await Promise.all(
      loggedInUser.following.map((otherUserId) => {
        return TweetModel.find({ userId: otherUserId });
      })
    );
    return res.status(200).json({
      tweets: [].concat(...followingUserTweet),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}
module.exports = { createTweet, deleteTweet, likeOrDislike, getAllTweet,getFollowingTweet };
