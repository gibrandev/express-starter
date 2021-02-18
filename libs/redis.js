require('dotenv').config();
const redis = require("redis");
const options = {
    host: process.env.REDIS_DB_HOST || '127.0.0.1',
    port: process.env.REDIS_DB_PORT || 6379,
    auth_pass: process.env.REDIS_DB_PASSWORD || null,
    db: 1,
    prefix: process.env.REDIS_DB_PREFIX || 'Express'
}
module.exports = redis.createClient(options);