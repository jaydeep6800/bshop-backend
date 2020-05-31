const express = require("express");
const router = express.Router();

const {
  sendUserData,
  update,
} = require("../controllers/user");
const {
  isAdmin,
  isAuth,
} = require("../helpers/authHelper");

router.get("/", isAuth, sendUserData);
router.put("/", isAuth, update);

module.exports = router;
