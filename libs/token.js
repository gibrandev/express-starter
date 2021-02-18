require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const redis = require('./redis')
const jwt = require('jsonwebtoken');
exports.generator = async (req, res, next) => {
    var host = req.get('host');
    var IdToken = uuidv4();
    var token = jwt.sign({ iss: host, sub: 'gibrandev', type: 'user', jti: IdToken }, process.env.JWT_SECRET || '');
    redis.set(`${process.env.REDIS_DB_NAME || 'Express'}:jwt:token:${IdToken}`, token);
    return token;
};

exports.check = async (key) => {
    return new Promise((resolve, reject) => {
        redis.get(`${process.env.REDIS_DB_NAME || 'Express'}:jwt:token:${key}`, (e, data) => {
            if(e){
                reject(false);
            }
            if(data != null) {
                resolve(true);
            } else {
                resolve(false)
            }
        });
    });
}