"use strict";
const nodemailer = require("nodemailer");
const { pugEngine } = require("nodemailer-pug-engine");

let transporter = nodemailer.createTransport({
    host: "localhost",
    port: 1025,
    secure: false,
    auth: {
        user: 'project.1',
        pass: 'secret.1',
    },
});
transporter.use('compile', pugEngine({
    templateDir: process.cwd() + '/views/mails'
}));
module.exports = transporter