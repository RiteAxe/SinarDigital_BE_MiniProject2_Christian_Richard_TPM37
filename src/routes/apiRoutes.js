const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const { validateOrder } = require("../middlewares/validator");

router.post("/orders", validateOrder, orderController.createOrder);

router.get("/orders", orderController.getOrdersApi);

module.exports = router;
