require('dotenv').config();
const jwt = require('jsonwebtoken');
exports.generator = async function (req, res, next) {
    var host = req.get('host');
    return jwt.sign({ iss: host, sub: 'gibrandev', type: 'user' }, process.env.JWT_SECRET || '');
};