const User = require('../model/user');

async function handleSignUp(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.redirect('/');
};

module.exports = { handleSignUp };