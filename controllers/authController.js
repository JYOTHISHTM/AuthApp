const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const MESSAGES = require("../constants/messages");
const STATUS = require("../constants/statusCodes");
const { isValidEmail } = require("../utils/validators");
const { sendSuccess, sendError } = require("../utils/response");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name) return sendError(res, MESSAGES.NAME_REQUIRED);
        if (!email) return sendError(res, MESSAGES.EMAIL_REQUIRED);
        if (!isValidEmail(email)) return sendError(res, MESSAGES.INVALID_EMAIL);
        if (!password) return sendError(res, MESSAGES.PASSWORD_REQUIRED);

        if (password.length < 6) return sendError(res, MESSAGES.PASSWORD_MIN_LENGTH);
        if (!/[A-Z]/.test(password)) return sendError(res, MESSAGES.PASSWORD_UPPERCASE_REQUIRED);
        if (!/[0-9]/.test(password)) return sendError(res, MESSAGES.PASSWORD_NUMBER_REQUIRED);
        if (/\s/.test(password)) return sendError(res, MESSAGES.PASSWORD_NO_SPACES);
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return sendError(res, MESSAGES.PASSWORD_SPECIAL_REQUIRED);

        const existing = await User.findOne({ email });
        if (existing) return sendError(res, MESSAGES.USER_EXISTS, STATUS.CONFLICT);

        const hashedPassword = await bcrypt.hash(password, 10);

        await new User({ name, email, password: hashedPassword }).save();

        return sendSuccess(res, MESSAGES.REGISTER_SUCCESS);

    } catch (err) {
        console.error(err);
        return sendError(res, MESSAGES.SERVER_ERROR, STATUS.SERVER_ERROR);
    }
};

exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;

        email = email?.trim();
        password = password?.trim();

        if (!email) return sendError(res, MESSAGES.EMAIL_REQUIRED);
        if (!password) return sendError(res, MESSAGES.PASSWORD_REQUIRED);

        const user = await User.findOne({ email });
        if (!user) return sendError(res, MESSAGES.USER_NOT_FOUND, STATUS.UNAUTHORIZED);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return sendError(res, MESSAGES.WRONG_PASSWORD, STATUS.UNAUTHORIZED);

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.cookie("token", token, { httpOnly: true });

        return sendSuccess(res, MESSAGES.LOGIN_SUCCESS);

    } catch (err) {
        console.error(err);
        return sendError(res, MESSAGES.SERVER_ERROR, STATUS.SERVER_ERROR);
    }
};

exports.logout = async (req, res) => {
    res.clearCookie("token");
    return res.redirect("/user/login");
};
