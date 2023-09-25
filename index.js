const express = require('express');
const path = require('path');

const urlRoute = require('./routes/routes');
const staticRoute = require('./routes/staticRoute')
const { userLog } = require('./middleware/middleware');

const app = express();

const { connectToDB } = require('./connect');
const URL = require('./model/user');

require('dotenv').config()

connectToDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB connected")
)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userLog('log.txt'));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.use("/", staticRoute);
app.use("/url", urlRoute);

app.get("/url/:shortId", urlRoute);

app.listen(process.env.PORT, () => console.log(`server running on port: http://localhost:${process.env.PORT}`));