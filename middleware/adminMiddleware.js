const jwt = require('jsonwebtoken');

exports.adminProtect = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.redirect('/admin/login');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.admin) throw new Error('Not admin');

        req.admin = decoded;

        // prevent back button after logout
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');

        next();
    } catch (err) {
        res.clearCookie('token');
        return res.redirect('/admin/login');
    }
};
