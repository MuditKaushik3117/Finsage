const express = require("express");

const router = express.Router();

const {
    getQuote
} = require("../controllers/marketController");

router.get("/:symbol", getQuote);

module.exports = router;

