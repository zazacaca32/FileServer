const upload = require("../middleware/upload");
const fs = require("fs");
const path = require("path");


const directoryPath = `${__dirname}/../../upload/`;

const match_video = ["mp4"];
const match_image = ["png", "jpeg", "jpg"];

const BASE = "http://45.95.67.7:3000/show"



const multipleUpload = async (req, res) => {
    try {
        await upload(req, res);
        console.log(req.files);

        if (req.files.length <= 0) {
            return res.send(`You must select at least 1 file.`);
        }

        return res.send(`Files has been uploaded.`);
    } catch (error) {
        console.log(error);

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.send("Too many files to upload.");
        }
        return res.send(`Error when trying upload many files: ${error}`);
    }
};

const getListFiles = (req, res) => {

    fs.readdir(directoryPath, function(err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }

        let fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: BASE + "/" + file,
            });
        });

        res.status(200).send(fileInfos);
    });
};

const getListVideoFiles = (req, res) => {

    fs.readdir(directoryPath, function(err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }

        let fileInfos = [];

        files.forEach((file) => {
            var extension = file.split(".").at(-1);
            if (match_video.indexOf(extension) != -1)
                fileInfos.push({
                    name: file,
                    url: BASE + "/" + file,
                });
        });

        res.status(200).send(fileInfos);
    });
};

const getListImageFiles = (req, res) => {

    fs.readdir(directoryPath, function(err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }

        let fileInfos = [];

        files.forEach((file) => {
            var extension = file.split(".").at(-1);
            console.log(file, extension)

            if (match_image.indexOf(extension) != -1)
                fileInfos.push({
                    name: file,
                    url: BASE + "/" + file,
                });
        });

        res.status(200).send(fileInfos);
    });

};

const download = (req, res) => {
    const fileName = req.params.name;

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};

const show = (req, res) => {
    const fileName = req.params.name;
    var p = path.resolve(directoryPath + fileName)
    console.log(p);
    res.sendFile(p, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not show the file. " + err,
            });
        }
    });
};

module.exports = {
    multipleUpload: multipleUpload,
    getListFiles: getListFiles,
    getListVideoFiles: getListVideoFiles,
    getListImageFiles: getListImageFiles,
    download: download,
    show: show,
};