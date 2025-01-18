const express = require("express");
const { addCategory } = require("../controller/categoryController");
const{authMiddleware} = require('../middlewares/authmiddleware')
const router = express.Router();

router.post("/", authMiddleware, addCategory); 

module.exports = router;
