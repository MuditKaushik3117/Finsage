const express = require("express");
const router = express.Router();

const {
    generatePortfolio,
    getPortfolio
} = require("../controllers/portfolioController");

router.post("/generate/:userId", generatePortfolio);

router.get("/:userId", getPortfolio);

module.exports = router;

