const express = require("express");
const router = express.Router();
const user = require("../models/user");
const multer = require("multer");

router.get("/", (req, res) => {
    res.render("index", { title: "Home page" });
})

router.get("/add", (req, res) => {
    res.render("add_users", { title: "Add new User" });
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now()+"_"+file.originalname);
    },
});

var upload = multer({ 
    storage: storage 
}).single("image");

router.post("/add", upload, (req, res) => {
    const user = new user({
        name: req.body.name,
        email: req.body.email,
        image: req.file.path,
    });
})

module.exports = router;

