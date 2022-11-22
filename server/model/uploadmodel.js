const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  name: String,
  image_name: String,
  summary: String,
  createdAd: {
    type: Date,
    default: Date.now(),
  },
});

const UploadModel = mongoose.model("uploaddocument", uploadSchema);
module.exports = UploadModel;
