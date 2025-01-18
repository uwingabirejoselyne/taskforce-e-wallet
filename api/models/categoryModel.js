const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  parentCategory: { type: String, ref: "Category", default: null },
  userId: { type: String, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);
