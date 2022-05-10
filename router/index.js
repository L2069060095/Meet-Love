const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/index", (req, res) => {
    res.render("index.html");
});

module.exports = router;