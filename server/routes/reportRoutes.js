const express = require("express");

const router = express.Router();

const { generateReport, generatePresentation } = require("../controllers/reportController");

router.get("/presentation", generatePresentation);
router.get("/:userId", generateReport);

module.exports = router;

