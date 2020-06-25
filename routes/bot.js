const express = require("express");
const router = express.Router();
const structjson = require("../helpers/struckjson");
const {
  textQueryController,
  eventQueryController,
} = require("../controllers/bot");

// two routes

// text Query route

router.post("/textquery", textQueryController);

// Event Query route
router.post("/eventquery", eventQueryController);

module.exports = router;
