const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/upload", () => {
  console.log("databse connect successfully 👌");
});
