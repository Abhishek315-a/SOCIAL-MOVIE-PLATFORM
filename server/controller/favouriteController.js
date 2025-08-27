const favouriteMovieModel = require("../models/favouriteMovie");
const favouritetvModel = require("../models/favouriteTv");
const userModel = require("../models/user");

// Add Movie to Favourite
const favouriteMovie = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPresent = await favouriteMovieModel.exists({ email, movieId });
    if (isPresent) {
      return res.json({ success: false, message: "Already added to favourite" });
    }

    const newMovie = new favouriteMovieModel({ email, movieId });
    await newMovie.save();

    return res.status(200).json({ success: true, message: "Added to favourite", newMovie });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add TV to Favourite
const favouriteTv = async (req, res) => {
  try {
    const { email, tvId } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPresent = await favouritetvModel.exists({ email, tvId });
    if (isPresent) {
      return res.json({ success: false, message: "Already added to favourite" });
    }

    const newTv = new favouritetvModel({ email, tvId });
    await newTv.save();

    return res.status(200).json({ success: true, message: "Added to favourite", newTv });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch All Favourite Movies
const fetchFavouriteMovie = async (req, res) => {
  try {
    const email = req.user.email;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const favourites = await favouriteMovieModel.find({ email });
    const movieIds = favourites.map((fav) => fav.movieId);

    return res.status(200).json({ movies: movieIds });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Fetch All Favourite TV
const fetchFavouriteTv = async (req, res) => {
  try {
    const email = req.user.email;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const favourites = await favouritetvModel.find({ email });
    const tvIds = favourites.map((fav) => fav.tvId);

    return res.status(200).json({ tvs: tvIds });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Toggle Movie Favourite
const toggleFavouriteMovie = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    if (!email || !movieId) {
      return res.status(400).json({ success: false, message: "Missing parameters" });
    }

    const existing = await favouriteMovieModel.findOne({ email, movieId });
    if (existing) {
      await favouriteMovieModel.deleteOne({ email, movieId });
      return res.json({ success: true, isFavourite: false });
    } else {
      await favouriteMovieModel.create({ email, movieId });
      return res.json({ success: true, isFavourite: true });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
};

// Toggle TV Favourite
const toggleFavouriteTv = async (req, res) => {
  try {
    const { email, tvId } = req.body;
    if (!email || !tvId) {
      return res.status(400).json({ success: false, message: "Missing parameters" });
    }

    const existing = await favouritetvModel.findOne({ email, tvId });
    if (existing) {
      await favouritetvModel.deleteOne({ email, tvId });
      return res.json({ success: true, isFavourite: false });
    } else {
      await favouritetvModel.create({ email, tvId });
      return res.json({ success: true, isFavourite: true });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
};

// Check Favourite Status for Movie
const checkFavouriteStatus = async (req, res) => {
  try {
    const { email, movieId } = req.query;
    if (!email || !movieId) {
      return res.status(400).json({ success: false, message: "Missing parameters" });
    }

    const isFavourite = await favouriteMovieModel.exists({ email, movieId });
    return res.status(200).json({ success: true, isFavourite: !!isFavourite });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
};

// Check Favourite Status for TV
const checkFavouriteTvStatus = async (req, res) => {
  try {
    const { email, tvId } = req.query;
    if (!email || !tvId) {
      return res.status(400).json({ success: false, message: "Missing parameters" });
    }

    const isFavourite = await favouritetvModel.exists({ email, tvId });
    return res.status(200).json({ success: true, isFavourite: !!isFavourite });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
};

module.exports = {
  favouriteMovie,
  favouriteTv,
  fetchFavouriteMovie,
  fetchFavouriteTv,
  toggleFavouriteMovie,
  toggleFavouriteTv,
  checkFavouriteStatus,
  checkFavouriteTvStatus
};
