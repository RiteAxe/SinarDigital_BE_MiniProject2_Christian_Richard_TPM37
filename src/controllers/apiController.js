const path = require("path");
const fs = require("fs");
const { generateOrderId } = require("../utils/helpers");

const { dataPath } = require("../config/app.config");

const readData = () => {
  const raw = fs.readFileSync(dataPath, "utf-8") || '{"orders": []}';
  return JSON.parse(raw);
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

const createOrder = (req, res, next) => {
  try {
    const { name, menu, quantity, note } = req.body;

    const data = readData();

    const newOrder = {
      id: generateOrderId(data.orders),
      name,
      menu,
      quantity: Number(quantity),
      note: note || "",
      createdAt: new Date().toISOString(),
    };

    data.orders.push(newOrder);
    writeData(data);

    return res.redirect("/orders");
  } catch (err) {
    next(err);
  }
};

const getOrders = (req, res, next) => {
  try {
    const data = readData();
    res.json({ status: "success", data: data.orders });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
  getOrders,
};
