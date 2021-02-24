"use strict";
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    host: "localhost",
    port: 1025,
    secure: false,
    auth: {
        user: 'project.1',
        pass: 'secret.1',
    },
});
module.exports = transporter