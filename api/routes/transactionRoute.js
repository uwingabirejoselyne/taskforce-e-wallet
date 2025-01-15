const express = require("express");
const { addTransaction } = require("../controller/transactionController");
const{authMiddleware} = require('../middlewares/authmiddleware')
const router = express.Router();

router.post("/", authMiddleware, addTransaction);

module.exports = router;
