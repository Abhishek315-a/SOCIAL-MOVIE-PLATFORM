const express = require("express");
const {
  favouriteMovie,
  favouriteTv,
  fetchFavouriteMovie,
  fetchFavouriteTv,
  toggleFavouriteMovie,
  checkFavouriteStatus,
  toggleFavouriteTv,
  checkFavouriteTvStatus,
} = require("../controller/favouriteController");
const verifyToken = require("../middleware/VerifyToken");

const router = express.Router();

router.post("/movie",verifyToken, favouriteMovie);
router.post("/tv",verifyToken, favouriteTv);
router.post("/toggle", toggleFavouriteMovie);
router.post("/toggle/tv", toggleFavouriteTv);
router.get("/status", checkFavouriteStatus);
router.get("/status/tv", checkFavouriteTvStatus);
router.get("/movie/list", verifyToken, fetchFavouriteMovie);
router.get("/tv/list", verifyToken, fetchFavouriteTv);

module.exports = router;
