const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username });
        const regUser = await User.register(user, password);
        req.login(regUser, err => {
            if (err) return next(err);
            req.flash('success', 'Thank You For Signing Up');
            res.redirect('/clock');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.reactRegister = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const user = new User({ username, email })
        const regUser = await User.register(user, password)
        res.status(201).json({ createdAt: { seconds: new Date().getTime() },id: regUser.id, displayName: reqUser.username, email: reqUser.email })
    } catch {
        res.status(403)
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = req.session.returnTo || '/clock';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.reactLogin = async (req, res) => {
    const username = req.body.username
    const user = await User.find({ username })
    const id = user[0].id
    const displayName = username
    if (!user[0].email) email = `${username}@justfakingthis.com`
    res.status(201).json({ createdAt: { seconds: new Date().getTime() },id, displayName, email })
}

module.exports.reactLogout = (req, res) => {
    req.logout()
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', `Enjoy your time off, ${req.body.username}`);
    res.redirect('/');
}