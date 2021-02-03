var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/AuthController');
var UserMiddleware = require('../middlewares/UserMiddleware');

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/login', AuthController.login);
router.get('/me', UserMiddleware, AuthController.me);
router.get('/logout', AuthController.logout);

module.exports = router;