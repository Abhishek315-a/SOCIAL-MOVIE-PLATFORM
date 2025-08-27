const express = require("express");
const {
  signup,
  login,
  passwor_Update,
  bookmark,
  getMyProfile,
  getOtherProfile,
  follow,
  unfollow,
} = require("../controller/userController");
const verifyToken = require("../middleware/VerifyToken");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/update-password", verifyToken, passwor_Update);
router.put("/bookmark/:id", verifyToken, bookmark);
router.get("/profile/:id", verifyToken, getMyProfile);
router.get("/otheruser/:id", verifyToken, getOtherProfile);
router.post("/follow/:id", verifyToken, follow);
router.post("/unfollow/:id", verifyToken, unfollow);

module.exports = router;
