"use strict";
require('dotenv').config();
const nodemailer = require("nodemailer");
const { pugEngine } = require("nodemailer-pug-engine");

let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE === 'true' ? true : false,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});
transporter.use('compile', pugEngine({
    templateDir: process.cwd() + '/views/mails'
}));
module.exports = transporter;