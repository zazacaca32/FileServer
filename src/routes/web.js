const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/files");

let routes = app => {
  router.get("/", homeController.getHome);

  router.get("/getListFiles", uploadController.getListFiles);
  router.get("/getListVideoFiles", uploadController.getListVideoFiles);
  router.get("/getListImageFiles", uploadController.getListImageFiles);

  router.get("/download/:name", uploadController.download);
  router.get("/show/:name", uploadController.show);

  router.post("/multiple-upload", uploadController.multipleUpload);
  

  return app.use("/", router);
};

module.exports = routes;