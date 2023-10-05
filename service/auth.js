const jwt = require("jsonwebtoken");

const secret = "s3cr3tk3y";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret,
    { expiresIn: "1h" }
  );
}

function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, secret);
}

module.exports = { setUser, getUser };
