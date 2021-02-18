require('dotenv').config();
const jwt = require('jsonwebtoken');
const moment = require('moment');
const model = require('../models/index');

exports.generator = async (req, res, next) => {
    var host = req.get('host');
    var type = 'user';
    var sub = 'gibrandev';

    var IdToken = await model.token.create({
        id: IdToken,
        sub: sub,
        type: type
    });

    var token = jwt.sign({ 
        iss: host,
        sub: sub,
        type: type,
        jti: IdToken.id 
    }, process.env.JWT_SECRET || '');
    return token;
};

exports.check = async (key) => {
    var IdToken = await model.token.findByPk(key);
    if(IdToken) {
        IdToken.lastAccessAt = moment();
        await IdToken.save();
        return true
    } else {
        return false
    }
}