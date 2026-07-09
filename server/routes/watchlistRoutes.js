const express = require("express");

const router = express.Router();

const {
    addWatchlist,
    getWatchlist,
    deleteWatchlist
} = require("../controllers/watchlistController");

router.post("/", addWatchlist);

router.get("/:userId", getWatchlist);

router.delete("/:id", deleteWatchlist);

module.exports = router;

