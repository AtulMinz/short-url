const { v4: uuidv4 } = require("uuid");
const User = require("../model/user");
const { setUser } = require("../service/auth");

async function handleSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleLogIn(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("/login", {
      error: "Invalid email or password",
    });
  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  res.redirect("/");
}

module.exports = { handleSignUp, handleLogIn };
