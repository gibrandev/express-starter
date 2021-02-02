var express = require('express');
var router = express.Router();
require('dotenv').config();
var UserMiddleware = require('../middlewares/UserMiddleware');

router.get('/login', async function (req, res, next) {
    return res.send('Login');
});

router.get('/me', UserMiddleware, async function (req, res, next) {
    console.log(res.user);
    return res.send('Me');
});

router.get('/logout', async function (req, res, next) {
    return res.send('Logout');
});

module.exports = router;