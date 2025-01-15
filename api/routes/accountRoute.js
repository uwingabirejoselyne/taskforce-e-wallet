const express = require("express");
const { addAccount } = require("../controller/accountController");
const{authMiddleware} = require('../middlewares/authmiddleware')
const router = express.Router();

router.post("/",authMiddleware,addAccount);

module.exports = router;
