const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
require("./config/config");
app.use(cors());
app.use(express.json());

const UploadModel = require("./model/uploadmodel");
app.use(express.static("public"));
app.get("/", async (req, res) => {
  try {
    const data = await UploadModel.find();
    res.json({
      message: "Success",
      data: {
        data: data,
      },
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});
const fileupload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "public/images");
    },
    filename: (req, file, callback) => {
      callback(null, Math.trunc(Math.random() * 1e20) + file.originalname);
    },
  }),
}).single("upload_file_name");
app.post("/upload", fileupload, async (req, res) => {
  try {
    const upload = await UploadModel.create({
      name: req.body.name,
      image_name: req.file.filename,
      summary: req.body.summary,
    });
    res.json({
      message: "upload SuccessFully",
      data: {
        data: upload,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const mdl = await UploadModel.deleteOne({ _id: req.params.id });
    res.json({
      message: "SuccessFully",
      data: {
        data: null,
      },
    });
  } catch (error) {
    console.log(error);
  }
});
app.listen("8080", () => {
  console.log("server running on this port http://localhost:8080/");
});
