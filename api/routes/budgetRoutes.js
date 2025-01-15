const express = require("express");
const { setBudget,checkBudget } = require("../controller/budgetController");
const{authMiddleware} = require('../middlewares/authmiddleware')
const router = express.Router();

router.post("/set",authMiddleware, setBudget);
router.get("/check", authMiddleware, checkBudget);

module.exports = router;
