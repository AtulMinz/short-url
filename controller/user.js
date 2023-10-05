const User = require("../model/user");
const { setUser } = require("../service/auth");

async function handleSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  const token = setUser(email);
  res.cookie("jwt", token);
  return res.redirect("/");
}

async function handleLogIn(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("/login", {
      error: "Invalid email or password",
    });
  const token = setUser(user);
  res.cookie("jwt", token);
  res.redirect("/");
}

module.exports = { handleSignUp, handleLogIn };
