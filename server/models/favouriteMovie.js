const mongoose = require("mongoose");
const { Schema } = mongoose;

const favouriteSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
});

const favouriteMovieModel = mongoose.model("favourites", favouriteSchema);
module.exports = favouriteMovieModel;
