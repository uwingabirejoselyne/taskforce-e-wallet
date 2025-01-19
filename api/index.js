require('dotenv').config();

const express = require('express');
const dbConnect = require('./config/dbConnect');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require("cors")
const userRoute = require('./routes/userRoute')
const accountRoutes = require("./routes/accountRoute");
const transactionRoutes = require("./routes/transactionRoute");
const budgetRoutes = require("./routes/budgetRoutes")
const categoryRoute = require("./routes/categoryRoute")

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: "https://taskforce-e-wallet-1.onrender.com" }))
app.use('/api/user', userRoute)
app.use("/api/accounts", accountRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/category", categoryRoute)
const PORT = process.env.PORT || 4000;
dbConnect();
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
