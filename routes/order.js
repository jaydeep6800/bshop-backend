const express = require("express");
const router = express.Router();

const {
  create,
  listOrders,
  getStatusValues,
  updateOrderStatus,
  orderById,
} = require("../controllers/order");
const {
  isAuth,
  isAdmin,
} = require("../helpers/authHelper");
const {
  descreaseQuantity,
} = require("../controllers/product");

router.post("/", isAuth, descreaseQuantity, create);
router.get("/", isAuth, isAdmin, listOrders);
router.get(
  "/status-values/",
  isAuth,
  isAdmin,
  getStatusValues
);
router.put(
  "/status/:orderId",
  isAuth,
  isAdmin,
  updateOrderStatus
);

router.param("orderId", orderById);

module.exports = router;
