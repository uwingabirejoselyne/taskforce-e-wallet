const express = require("express");
const { addTransaction, getTransactions } = require("../controller/transactionController");
const{authMiddleware} = require('../middlewares/authmiddleware')
const router = express.Router();

router.post("/", authMiddleware, addTransaction);
router.get("/", authMiddleware, getTransactions);

module.exports = router;
