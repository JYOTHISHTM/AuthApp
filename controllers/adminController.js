const User = require('../models/User');
const jwt = require('jsonwebtoken');
const MESSAGES = require('../constants/messages');
const STATUS = require('../constants/statusCodes');
const { sendSuccess, sendError } = require('../utils/response');
const { isValidEmail } = require('../utils/validators');

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendError(res, MESSAGES.ALL_FIELDS_REQUIRED);
        }

        if (!isValidEmail(email)) {
            return sendError(res, MESSAGES.INVALID_EMAIL);
        }

        if (
            email !== process.env.ADMIN_EMAIL ||
            password !== process.env.ADMIN_PASSWORD
        ) {
            return sendError(res, MESSAGES.INVALID_EMAIL_OR_PASSWORD, STATUS.UNAUTHORIZED);
        }

        const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.cookie("token", token, { httpOnly: true });
        return sendSuccess(res, MESSAGES.LOGIN_SUCCESS);
    } catch (err) {
        console.sendError(err);
        return sendError(res, MESSAGES.SERVER_ERROR, STATUS.SERVER_ERROR);
    }
};

exports.logout = (req, res) => {
    res.clearCookie("token");
    return res.redirect('/admin/login');
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().lean();
        return res.render("admin/dashboard", { users });
    } catch (err) {
        console.error(err);
        return res.status(STATUS.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

exports.blockUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { isBlocked: true });
        return res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        return res.status(STATUS.SERVER_ERROR).send("Error blocking user");
    }
};

exports.unBlockUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { isBlocked: false });
        return res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        return res.status(STATUS.SERVER_ERROR).send("Error unblocking user");
    }
};
