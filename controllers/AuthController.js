require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.login = function(req, res) {
    var token = jwt.sign({ username: 'gibrandev' }, process.env.JWT_SECRET || '');
    return res.status(200).json({
        message: 'Login',
        token: token
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