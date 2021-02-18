var express = require('express');
var router = express.Router();
var v1 = require('require-all')(process.cwd() + '/controllers/v1');
var Middleware = require('../middlewares/UserMiddleware');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', v1.AuthController.login);
router.get('/me', Middleware.auth, v1.AuthController.me);
router.get('/logout', Middleware.auth, v1.AuthController.logout);

module.exports = router;