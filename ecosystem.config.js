require('dotenv').config()
module.exports = {
    apps : [{
        name: process.env.APP_NAME || "Express Backend",
        script: "./index.js"
    }]
}