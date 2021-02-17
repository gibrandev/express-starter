require('dotenv').config();
const jwt = require('jsonwebtoken');
exports.generator = async function (req, res, next) {
    console.log(req)
    return jwt.sign({ username: 'gibrandev' }, process.env.JWT_SECRET || '');
};