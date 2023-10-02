const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { userLog } = require("./middleware/middleware");

const urlRoute = require("./routes/routes");
const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/user");

const { restrictToLoggedinUserOnly } = require("./middleware/auth");

const app = express();

const { connectToDB } = require("./connect");
const URL = require("./model/url");

require("dotenv").config();

connectToDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB connected")
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(userLog("log.txt"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.get("/url/:shortId", urlRoute);

app.listen(process.env.PORT, () =>
  console.log(`server running on port: http://localhost:${process.env.PORT}`)
);
