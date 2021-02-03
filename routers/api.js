var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/AuthController');
var UserMiddleware = require('../middlewares/UserMiddleware');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', AuthController.login);
router.get('/me', UserMiddleware, AuthController.me);
router.get('/logout', UserMiddleware, AuthController.logout);

module.exports = router;