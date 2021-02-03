require('dotenv').config();

exports.login = function(req, res) {
    return res.send('Login');
};

exports.me = function(req, res) {
    return res.send('Me');
};

exports.logout = function(req, res) {
    return res.send('Logout');
};