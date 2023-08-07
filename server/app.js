require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const app = express();
const mongodbConnect = require("./db/connection");
const URL = process.env.CONNECTION_STRING;
const router =  require('./routes/router');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('./uploads'));

app.use(router);

const start = async () => {
  try {
    await mongodbConnect(URL);
    app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
    });
  } catch (error) {
    console.log(error)
  }
};

start();
