var jwt = require('jsonwebtoken');
var UserMiddleware = async function (req, res, next) {
    var token = req.query.token || req.headers.authorization;
    if(token) {
        var bearer = token.includes("Bearer") || token.includes("bearer");
        if(bearer) {
            var bearer = token.replace(/ .*/, '');
            var reg = new RegExp('bearer', 'gi');
            token = token.replace(reg, '').trim();
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