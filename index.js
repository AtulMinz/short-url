const express = require('express');

const urlRoute = require('./routes/routes');
const { userLog } = require('./middleware/middleware');

const app = express();

const { connectToDB } = require('./connect');
const URL = require('./model/user');

require('dotenv').config()

connectToDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb connected")
)

app.use(express.json());
app.use(userLog('log.txt'));

app.use('/url', urlRoute);

app.get("/:shortId", urlRoute);

app.listen(process.env.PORT, () => console.log(`server running on port: http://localhost:${process.env.PORT}`));