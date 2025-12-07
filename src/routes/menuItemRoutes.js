const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const upload = require("../middlewares/upload");
const { validateItem } = require("../middlewares/validator");

router.get("/", itemController.getItems);
router.get("/:id", itemController.getItemById);

router.post(
  "/",
  upload.single("image"),
  validateItem,
  itemController.createItem
);

router.put("/:id", upload.single("image"), itemController.updateItem);

router.delete("/:id", itemController.deleteItem);

module.exports = router;
