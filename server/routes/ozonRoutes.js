const express = require("express");
const router = express.Router();
const { scrapeOzon } = require("../controllers/ozonController");

router.post("/scrape", scrapeOzon);

module.exports = router;
