
const User = require('../models/User')
const jwt = require('jsonwebtoken');

exports.adminLogin = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, error: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.json({ success: false, error: "Enter a valid email address" });
    }

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
        return res.json({ success: false, error: "Invalid email or password" });
    }

    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true });

    return res.json({ success: true });
};



exports.logout = async (req, res) => {
    res.clearCookie("token")
    return res.redirect('/admin/login')
}


exports.getUsers = async (req, res) => {

    try {
        const users = await User.find()

        return res.render('admin/dashboard', { users })

    } catch (err) {
        console.error(err)
        res.send('some erorr')
    }

}


exports.blockUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { isBlocked: true })
        res.redirect('/admin/dashboard')
    } catch (err) {
        console.error(err)
        res.send("error in blocking user")
    }
}

exports.unBlockUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { isBlocked: false })
        res.redirect('/admin/dashboard')
    } catch (err) {
        console.error(err)
        res.send("error in unblocking user")
    }
}