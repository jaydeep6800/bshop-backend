const express = require("express");
const router = express.Router();

// import Controllers
const { signup, signin, signout } = require("../controllers/auth");

//import Validators
const { userSignupValidator } = require("../validators/index");

// routes to controllers
router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
