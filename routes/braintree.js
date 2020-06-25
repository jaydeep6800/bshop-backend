const express = require("express");
const { isAuth } = require("../helpers/authHelper");
const {
  generateToken,
  processPayment,
} = require("../controllers/braintree");
const router = express.Router();

router.get("/getToken", isAuth, generateToken);
router.post("/payment", isAuth, processPayment);

module.exports = router;
