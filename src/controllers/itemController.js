const fs = require("fs");
const prisma = require("../utils/prismaClient");

const deleteFileIfExists = (filePath) => {
  if (!filePath) return;
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

const getItems = async (req, res, next) => {
  try {
    const items = await prisma.menuItem.findMany({
      include: { category: true },
    });

    res.json({
      status: "success",
      data: items,
    });
  } catch (err) {
    next(err);
  }
};

const getItemById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const item = await prisma.menuItem.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!item) {
      return res.status(404).json({
        status: "error",
        message: "Item not found",
      });
    }

    res.json({
      status: "success",
      data: item,
    });
  } catch (err) {
    next(err);
  }
};

const createItem = async (req, res, next) => {
  try {
    const { name, price, categoryId } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const item = await prisma.menuItem.create({
      data: {
        name,
        price: Number(price),
        categoryId: Number(categoryId),
        image: imagePath,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Item created",
      data: item,
    });
  } catch (err) {
    next(err);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name, price, categoryId } = req.body;

    const existing = await prisma.menuItem.findUnique({
      where: { id },
    });

    if (!existing) {
      if (req.file) deleteFileIfExists(req.file.path);
      return res.status(404).json({
        status: "error",
        message: "Item not found",
      });
    }

    let imagePath = existing.image;
    if (req.file) {
      deleteFileIfExists(existing.image);
      imagePath = req.file.path;
    }

    const item = await prisma.menuItem.update({
      where: { id },
      data: {
        name: name ?? existing.name,
        price: price ? Number(price) : existing.price,
        categoryId: categoryId ? Number(categoryId) : existing.categoryId,
        image: imagePath,
      },
    });

    res.json({
      status: "success",
      message: "Item updated",
      data: item,
    });
  } catch (err) {
    next(err);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.menuItem.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        status: "error",
        message: "Item not found",
      });
    }

    deleteFileIfExists(existing.image);

    await prisma.menuItem.delete({
      where: { id },
    });

    res.json({
      status: "success",
      message: "Item deleted",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
