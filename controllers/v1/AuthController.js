require('dotenv').config();
const Token = require('../../libs/token');

exports.login = async (req, res) => {
    var getToken = await Token.generator(req);
    return res.status(200).json({
        message: 'Login',
        token: getToken
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