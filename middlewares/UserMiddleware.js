var UserMiddleware = async function (req, res, next) {
    if(req.query.login) {
        res.user = 'Gibran Dimasagung'
        next()
    } else {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
}
module.exports = UserMiddleware;