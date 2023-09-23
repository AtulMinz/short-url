const express = require('express');
const path = require('path');

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

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

app.get('/home', async (req, res) => {
  const allUrls = await URL.find({});
  return res.render('home', {
    urls : allUrls,
  });
});

app.use("/", urlRoute);

app.get("/url/:shortId", urlRoute);

app.listen(process.env.PORT, () => console.log(`server running on port: http://localhost:${process.env.PORT}`));