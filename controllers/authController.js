

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const MESSAGES = require("../constants/messages");

const STATUS = require("../constants/statusCodes");



exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // VALIDATIONS
        if (!name)
            return res.json({ success: false, message: MESSAGES.NAME_REQUIRED });

        if (!email)
            return res.json({ success: false, message: MESSAGES.EMAIL_REQUIRED });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email))
            return res.json({ success: false, message: MESSAGES.INVALID_EMAIL });

        if (!password)
            return res.json({ success: false, message: MESSAGES.PASSWORD_REQUIRED });

        if (password.length < 6)
            return res.json({ success: false, message: "Password must be at least 6 characters" });

        if (!/[A-Z]/.test(password))
            return res.json({ success: false, message: "Password must contain 1 uppercase letter" });

        if (!/[0-9]/.test(password))
            return res.json({ success: false, message: "Password must contain 1 number" });

        if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password))
            return res.json({ success: false, message: "Password must contain 1 special character" });

        if (/\s/.test(password))
            return res.json({ success: false, message: "Password cannot contain spaces" });

        // USER EXISTS?
        const existing = await User.findOne({ email });
        if (existing)
            return res.json({ success: false, message: MESSAGES.USER_EXISTS });

        // SAVE USER
        await new User({ name, email, password }).save();

        return res.json({
            success: true,
            message: MESSAGES.REGISTER_SUCCESS
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;

        email = email?.trim();
        password = password?.trim();

        if (!email)
            return res.json({ success: false, message: MESSAGES.EMAIL_REQUIRED });

        if (!password)
            return res.json({ success: false, message: MESSAGES.PASSWORD_REQUIRED });

        const user = await User.findOne({ email });

        if (!user)
            return res.json({ success: false, message: MESSAGES.USER_NOT_FOUND });

        if (user.password !== password)
            return res.json({ success: false, message: MESSAGES.WRONG_PASSWORD });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.cookie("token", token, { httpOnly: true });

        return res.json({ success: true, message: "Login successful" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};



exports.logout = async (req, res) => {
    res.clearCookie("token")
    return res.redirect('/user/login')
}