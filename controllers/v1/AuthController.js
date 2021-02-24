require('dotenv').config();
const Token = require('../../libs/token');
const Mail = require('../../libs/mail');

exports.login = async (req, res) => {
    var getToken = await Token.generator(req);
    return res.status(200).json({
        message: 'Login',
        token: getToken
    });
};

exports.me = async (req, res) => {
    await Mail.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
    return res.status(200).json({
        message: 'Me'
    });
};

exports.logout = (req, res) => {
    return res.status(200).json({
        message: 'Logout'
    });
};