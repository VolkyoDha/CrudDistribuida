const express = require("express");
const router = express.Router();
const User = require("../models/users");
const multer = require("multer");

router.get("/", (req, res) => {
    res.render("index", { title: "Home page" });
});

router.get("/add", (req, res) => {
    res.render("add_users", { title: "Add new User" });
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

var upload = multer({ storage: storage }).single("image");

// Middleware para verificar errores de carga de archivos
function handleUploadErrors(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        // Error de Multer
        res.json({ message: err.message, type: "danger" });
    } else if (err) {
        // Otro error
        res.json({ message: err.message, type: "danger" });
    } else {
        next(); // Pasar al siguiente middleware
    }
}

// Aplicar el middleware de multer antes del controlador POST
router.post("/add", upload, handleUploadErrors, async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: req.file.filename,
        });
        await user.save();
        req.session.message = {
            type: "success",
            message: "User added successfully",
        };
        res.redirect("/");
    } catch (error) {
        res.json({ message: error.message, type: "danger" });
    }
});

module.exports = router;
