require('dotenv').config();
const TokenGenerator = require('../libs/token')

exports.login = async (req, res) => {
    var token = await TokenGenerator(req);
    return res.status(200).json({
        message: 'Login',
        token: token
    });
};

exports.me = (req, res) => {
    return res.status(200).json({
        message: 'Me'
    });
};

exports.logout = (req, res) => {
    return res.status(200).json({
        message: 'Logout'
    });
};