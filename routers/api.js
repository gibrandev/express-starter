var express = require('express');
var router = express.Router();
var v1 = require('require-all')(process.cwd() + '/controllers/v1');
var UserMiddleware = require('../middlewares/UserMiddleware');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', v1.AuthController.login);
router.get('/me', UserMiddleware, v1.AuthController.me);
router.get('/logout', UserMiddleware, v1.AuthController.logout);

module.exports = router;