let express = require('express')
let path = require('path')
let router = express.Router()

router.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, './public/product.html'))
})

module.exports = router