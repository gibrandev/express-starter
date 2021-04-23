var jwt = require('jsonwebtoken');
const JwtToken = require('../libs/token');

exports.auth = async (req, res, next) => {
    var token = req.query.token || req.headers.authorization;
    if(token) {
        var bearer = token.includes("Bearer") || token.includes("bearer");
        if(bearer) {
            bearer = token.replace(/ .*/, '');
            var reg = new RegExp('bearer', 'gi');
            token = token.replace(reg, '').trim();
        }
        // Verify
        jwt.verify(token, process.env.JWT_SECRET || '', async (err, decoded) => {
            if(err) {
                return res.status(401).json({
                    message: 'Invalid token'
                });
            }
            // Check token exist or not
            var checkToken = await JwtToken.check(decoded.jti);
            if(checkToken === false) {
                return res.status(401).json({
                    message: 'Invalid token'
                });
            }
            // query get user
            res.user = decoded.sub;
            next();
        });
    } else {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
};