const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.APP_PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Listening at http://0.0.0.0:${port}`)
})