const express = require("express");
const { addCategory, getCategories } = require("../controller/categoryController");
const{authMiddleware} = require('../middlewares/authmiddleware')
const router = express.Router();

router.post("/", authMiddleware, addCategory); 
router.get("/", authMiddleware, getCategories);

module.exports = router;
