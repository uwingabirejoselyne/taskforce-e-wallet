require('dotenv').config(); // Load environment variables

const express = require('express');
const dbConnect = require('./config/dbConnect');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
const userRoute = require('./routes/userRoute')
const accountRoutes = require("./routes/accountRoute");
const transactionRoutes = require("./routes/transactionRoute");
app.use('/api/user',userRoute)
app.use("/api/accounts", accountRoutes);
app.use("/api/transactions", transactionRoutes);
const PORT = process.env.PORT || 4000;
dbConnect();
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
