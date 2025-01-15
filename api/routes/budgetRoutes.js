const express = require("express");
const { setBudget } = require("../controller/budgetController");
const{authMiddleware} = require('../middlewares/authmiddleware')
const router = express.Router();

router.post("/set",authMiddleware, setBudget); 

module.exports = router;
