require('dotenv').config(); // Load environment variables

const express = require('express');
const dbConnect = require('./config/dbConnect');
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const userRoute = require('./routes/userRoute')
app.use('/api/user',userRoute)
const PORT = process.env.PORT || 4000;
dbConnect();
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
