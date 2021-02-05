require('dotenv').config()
module.exports = {
    apps : [{
        name: 'express-backend',
        script: "./index.js",
        max_memory_restart: "150M",
        env: {
            NODE_ENV: "production",
        }
    }]
}