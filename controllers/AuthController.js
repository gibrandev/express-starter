require('dotenv').config();

exports.login = function(req, res) {
    return res.status(200).json({
        message: 'Login'
    });
};

exports.me = function(req, res) {
    return res.status(200).json({
        message: 'Me'
    });
};

exports.logout = function(req, res) {
    return res.status(200).json({
        message: 'Logout'
    });
};