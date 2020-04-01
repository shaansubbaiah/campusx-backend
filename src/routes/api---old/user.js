const { Router } = require('express')

const route = Router()

route.get('/', (req, res) => {
    res.send({
        "user":{
            "email": "demo@gmail.com",
            "token": "jwt.toke.here",
            "name": "Igor",
            "phone": 1234567890,
        }
    })
})

module.exports = route