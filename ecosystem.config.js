require('dotenv').config()
module.exports = {
    apps : [{
        name: 'express-backend',
        script: "./index.js",
        max_memory_restart: "512M",
        env: {
            NODE_ENV: "production",
        }
    }]
}