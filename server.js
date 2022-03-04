const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routers = require("./routers/index");
const errorHandler = require("./middlewares/errors/errorHandler");
const cors = require("cors");
const path = require("path")
const app = express();

//Environment Veriables

app.use(express.json());
dotenv.config({
  path: "./config/env/config.env",
});

app.use(express.static(path.join(__dirname,"public")))
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Db Connected");
});
const PORT = process.env.PORT;
app.use(cors());

app.use("/api", routers);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`app started on ${PORT}:${process.env.NODE_ENV}`);
});
