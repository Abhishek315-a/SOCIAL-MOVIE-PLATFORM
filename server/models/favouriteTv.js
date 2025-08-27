const mongoose = require("mongoose");
const { Schema } = mongoose;

const favouriteSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  tvId: {
    type: Number,
    required: true,
  },
});

const favouritetvModel = mongoose.model("favouriteTv", favouriteSchema);
module.exports = favouritetvModel;
