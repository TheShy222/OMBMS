let express = require('express')
let router = express.Router()
let login = require('./api/login/login.js')
router.post('/login', login.post)
module.exports = router