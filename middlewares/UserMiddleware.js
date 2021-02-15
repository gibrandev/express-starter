var jwt = require('jsonwebtoken');
var UserMiddleware = async function (req, res, next) {
    var token = req.query.token || req.headers.authorization;
    if(token) {
        var bearer = token.replace(/ .*/, '');
        if(bearer === 'Bearer' || bearer === 'bearer') {
            token = token.replace('Bearer ','');
        }
        jwt.verify(token, process.env.JWT_SECRET || '', function(err, decoded) {
            if(err) {
                return res.status(401).json({
                    message: 'Invalid token'
                });
            }
            // query get user
            res.user = decoded.username
            next()
        });
    } else {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
}
module.exports = UserMiddleware;