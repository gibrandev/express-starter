var express = require('express');
var router = express.Router();
require('dotenv').config();

router.get('/login', async function (req, res) {
    return res.send('Login');
});

router.get('/logout', async function (req, res) {
    return res.send('Logout');
});

router.get('/me', async function (req, res) {
    return res.send('Me');
});

module.exports = router;