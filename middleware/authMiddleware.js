const jwt = require('jsonwebtoken');
const User = require('../models/User')



exports.protect =async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/user/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");

        const user = await User.findById(decoded.userId);

        if (!user || user.isBlocked) {
            res.clearCookie("token"); 
            return res.redirect("/user/login");
        }
        next();
    } catch (err) {
        return res.redirect('/user/login');
    }
};

exports.preventLogin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next();
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return res.redirect('/user/home');
    } catch (err) {
        return next();
    }
};
