const { request } = require("express");
const express = require("express");
const router = express.Router();


router.get("/index", (req, res) => {
    res.render("index.html")
})


module.exports = router;