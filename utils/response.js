exports.sendSuccess = (res, message, data = {}) => {
    return res.status(200).json({ success: true, message, data });
};

exports.sendError  = (res, message, status = 400) => {
    return res.status(status).json({ success: false, error: message });
};
