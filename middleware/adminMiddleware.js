const jwt = require('jsonwebtoken');

exports.adminProtect = (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.redirect('/admin/login');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.admin) {
            throw new Error('Unauthorized');
        }

        req.admin = decoded;

        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');

        next();

    } catch (err) {
        res.clearCookie("token");
        return res.redirect('/admin/login');
    }
};
