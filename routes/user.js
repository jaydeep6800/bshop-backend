const express = require("express");
const router = express.Router();

const {
  sendUserData,
  update,
  purchaseHistory,
} = require("../controllers/user");
const {
  isAdmin,
  isAuth,
} = require("../helpers/authHelper");

router.get("/", isAuth, sendUserData);
router.put("/", isAuth, update);
router.get("/history", isAuth, purchaseHistory);

module.exports = router;
