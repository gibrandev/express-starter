require('dotenv').config();
const jwt = require('jsonwebtoken');
const moment = require('moment');
const model = require('../models/index');

exports.generator = async (req, type, sub) => {
    return new Promise(async(resolve, reject) => {
        try {
            var host = req.get('host');
            var ip = req.ip;
        
            var user = await model.user.findOne({ where: { email: sub } });

            var IdToken = await model.token.create({
                id: IdToken,
                sub: sub,
                type: type,
                ip: ip,
                object_id: user.id
            });
        
            var token = jwt.sign({ 
                iss: type,
                sub: user.id,
                jti: IdToken.id 
            }, process.env.JWT_SECRET || '');
            resolve(token);
        } catch (err) {
            reject(err);
        }
    });
};

exports.check = async (key) => {
    var IdToken = await model.token.findByPk(key);
    if(IdToken) {
        IdToken.lastAccessAt = moment();
        await IdToken.save();
        return true;
    } else {
        return false;
    }
};

exports.getUser = async (decoded) => {
    var user;
    if(decoded.iss === 'user') {
        user = await model.user.findOne({ 
            attributes: {
                exclude: ['password', 'email']
            },
            where: { 
                id: decoded.sub 
            }
        });
    } else {
        user = null;
    }
    return user;
}