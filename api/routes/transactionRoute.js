const express = require("express");
const { addTransaction, getTransactions,generateReport } = require("../controller/transactionController");
const{authMiddleware} = require('../middlewares/authmiddleware')
const router = express.Router();

router.post("/", authMiddleware, addTransaction);
router.get("/", authMiddleware, getTransactions);
router.get("/report", authMiddleware, generateReport);

module.exports = router;
