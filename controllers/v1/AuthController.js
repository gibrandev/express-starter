require('dotenv').config();
const Token = require('../../libs/token');
const Mail = require('../../libs/mail');

exports.login = async (req, res) => {
    await Token.generator(req, 'user', 'gibrandev@gmail.com').then((responses) => {
        return res.status(200).json({
            message: 'Login',
            token: responses
        });
    }).catch(error => {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    });
};

exports.me = async (req, res) => {
    // await Mail.sendMail({
    //     from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //     to: "bar@example.com, baz@example.com", // list of receivers
    //     subject: "Hello ✔", // Subject line
    //     template: 'test',
    // });
    return res.status(200).json({
        message: 'Me'
    });
};

exports.logout = (req, res) => {
    return res.status(200).json({
        message: 'Logout'
    });
};