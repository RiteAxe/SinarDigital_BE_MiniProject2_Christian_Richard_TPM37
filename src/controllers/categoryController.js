const prisma = require("../utils/prismaClient");

const getCategories = async (req, res, next) => {
  try {
    const categories = await prisma.menuCategory.findMany({
      include: { items: true },
    });
    res.json({
      status: "success",
      data: categories,
    });
  } catch (err) {
    next(err);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const category = await prisma.menuCategory.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }

    res.json({
      status: "success",
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const category = await prisma.menuCategory.create({
      data: { name },
    });

    res.status(201).json({
      status: "success",
      message: "Category created",
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    const category = await prisma.menuCategory.update({
      where: { id },
      data: { name },
    });

    res.json({
      status: "success",
      message: "Category updated",
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    await prisma.menuCategory.delete({
      where: { id },
    });

    res.json({
      status: "success",
      message: "Category deleted",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
