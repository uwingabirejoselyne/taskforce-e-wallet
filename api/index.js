require('dotenv').config(); // Load environment variables

const express = require('express');
const dbConnect = require('./config/dbConnect');

const app = express();
const PORT = process.env.PORT || 4000;
dbConnect();
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
