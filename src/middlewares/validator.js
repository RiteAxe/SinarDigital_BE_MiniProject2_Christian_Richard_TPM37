const validateOrder = (req, res, next) => {
  const { name, menu, quantity } = req.body;

  if (!name || !menu || !quantity) {
    return res.status(400).send("Field wajib diisi.");
  }

  if (Number(quantity) <= 0) {
    return res.status(400).send("Jumlah harus > 0.");
  }

  next();
};

const validateCategory = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      status: "error",
      message: "name is required",
    });
  }

  next();
};

const validateItem = (req, res, next) => {
  const { name, price, categoryId } = req.body;

  if (!name || !price || !categoryId) {
    return res.status(400).json({
      status: "error",
      message: "name, price, and categoryId are required",
    });
  }

  if (isNaN(Number(price)) || isNaN(Number(categoryId))) {
    return res.status(400).json({
      status: "error",
      message: "price and categoryId must be numbers",
    });
  }

  next();
};

module.exports = {
  validateOrder,
  validateCategory,
  validateItem,
};
