const express = require("express");
const router = express.Router();

const {
  categoryById,
  getSingleCategory,
  create,
  update,
  remove,
  getAllCategories,
} = require("../controllers/category");
const {
  isAdmin,
  isAuth,
} = require("../helpers/authHelper");

router.get("/:categoryId", getSingleCategory);
router.post("/create", isAuth, isAdmin, create);
router.put("/:categoryId", isAuth, isAdmin, update);
router.delete("/:categoryId", isAuth, isAdmin, remove);
router.get("/", getAllCategories);

router.param("categoryId", categoryById);

module.exports = router;
