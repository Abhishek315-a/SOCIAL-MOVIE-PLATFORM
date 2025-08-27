const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, username ,email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
      res.status(400).json({ message: "User already exist" });
    }
    const newPassword = await bcrypt.hash(password, 10);
    const newUser = userModel({
      name: name,
      username:username,
      email: email,
      password: newPassword,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ success: true, message: "User Signed up Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Email or Password" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.status(200).json({
      success: true,
      message: "Login Successfully",
      token,
      name: user.name,
      user,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const passwor_Update = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect old password" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "password updated succesfully" });
  } catch (error) {
    console.error("Password update error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const bookmark = async (req, res) => {
  try {
    const loggedInUser = req.body.id;
    const tweetId = req.params.id;

    // Fetch the user
    const user = await userModel.findById(loggedInUser);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    if (user.bookmarks.includes(tweetId)) {
      // Remove tweet from bookmarks
      await userModel.findByIdAndUpdate(loggedInUser, {
        $pull: { bookmarks: tweetId },
      });
      return res.status(200).json({
        message: "Tweet removed from bookmarks",
        success: true,
      });
    } else {
      // Add tweet to bookmarks
      await userModel.findByIdAndUpdate(loggedInUser, {
        $addToSet: { bookmarks: tweetId },
      });
      return res.status(200).json({
        message: "Tweet saved in bookmarks",
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id).select("-password");
    return res.status(200).json({
      success:true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
const getOtherProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const otherUsers = await userModel
      .find({ _id: { $ne: id } })
      .select("-password");

    return res.status(200).json({
      success: true,
      otherUsers,
    });

  } catch (error) {
    console.error("Error fetching other users:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const follow = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const userId = req.params.id;

    // FIX: await the queries
    const loggedInUser = await userModel.findById(loggedInUserId);
    const user = await userModel.findById(userId);

    // Check if users exist
    if (!user || !loggedInUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Check if already following
    if (!user.followers.includes(loggedInUserId)) {
      await user.updateOne({ $push: { followers: loggedInUserId } });
      await loggedInUser.updateOne({ $push: { following: userId } });

      return res.status(200).json({
        message: `You just followed ${user.name}`,
        success: true,
      });
    } else {
      return res.status(400).json({
        message: `You already follow ${user.name}`,
        success: false,
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
const unfollow = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const userId = req.params.id;

    // FIX: await the queries
    const loggedInUser = await userModel.findById(loggedInUserId);
    const user = await userModel.findById(userId);

    // Check if users exist
    if (!user || !loggedInUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Check if already following
    if (loggedInUser.following.includes(userId)) {
      await user.updateOne({ $pull: { followers: loggedInUserId } });
      await loggedInUser.updateOne({ $pull: { following: userId } });

      return res.status(200).json({
        message: `You just unfollowed ${user.name}`,
        success: true,
      });
    } else {
      return res.status(400).json({
        message: `You do not follow ${user.name}`,
        success: false,
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

module.exports = {
  signup,
  login,
  passwor_Update,
  bookmark,
  getMyProfile,
  getOtherProfile,
  follow,
  unfollow,
};
