const express = require("express");
const router = express.Router();

const {
  create,
  productById,
  getOneProduct,
  remove,
  update,
  getAllProducts,
  getRelated,
  getAllCategories,
  getByFilter,
  getPhoto,
} = require("../controllers/product");

const {
  isAuth,
  isAdmin,
} = require("../helpers/authHelper");

router.post("/create", isAuth, isAdmin, create);
router.post("/by/filter", getByFilter);
router.delete("/:productId", isAuth, isAdmin, remove);
router.put("/:productId", isAuth, isAdmin, update);

router.get("/category", getAllCategories);
router.get("/:productId", getOneProduct);
router.get("/", getAllProducts);
router.get("/related/:productId", getRelated);
router.get("/photo/:productId", getPhoto);

router.param("productId", productById);

module.exports = router;
