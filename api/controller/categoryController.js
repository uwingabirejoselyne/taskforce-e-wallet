const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

// Add a new category or subcategory
const addCategory = asyncHandler(async (req, res) => {
  const { name, parentCategory } = req.body;

  try {
    if (!name) {
      res.status(400);
      throw new Error("Category name is required");
    }

    const categoryExists = await Category.findOne({ name, userId: req.user._id });
    if (categoryExists) {
      res.status(400);
      throw new Error("Category already exists");
    }

    const category = await Category.create({
      name,
      parentCategory: parentCategory || null,
      userId: req.user._id,
    });

    res.status(201).json({ message: "Category added successfully", category });
  } catch (error) {
    console.error("Error adding category:", error.message);
    res.status(res.statusCode || 500).json({ message: error.message || "Server Error" });
  }
});


const getCategories = async (req, res) => {
    try {
      const categories = await Category.find({ userId: req.user._id }).populate("parentCategory");
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching categories", error: error.message });
    }
  };
  
module.exports = { addCategory };
