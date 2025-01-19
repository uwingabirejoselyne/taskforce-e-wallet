const express = require("express");
const { addAccount,getAccounts} = require("../controller/accountController");
const{authMiddleware} = require('../middlewares/authmiddleware')
const router = express.Router();

router.post("/",authMiddleware,addAccount);
router.get("/",authMiddleware,getAccounts);

module.exports = router;
