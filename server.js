const express = require("express");
const app = express();
require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");
const Admin = require("./controller/Admin");
const Posts = require("./controller/Posts");
const Login = require("./controller/Login");

// const isLogin = require("./middlewares/isLogin");
// const isAdmin = require("./middlewares/isAdmin");

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// app.use(isLogin);
// app.use(isAdmin);

//view engine
// app.set("views", "./views");
// app.set("view engine", "ejs");

// Routes
app.use("/", Login);
app.use("/", Posts);
app.use("/", Admin);

//server Listening
app.listen(5000 || process.env.PORT, () =>
  console.log(`App listening at http://localhost:${process.env.PORT}`)
);
