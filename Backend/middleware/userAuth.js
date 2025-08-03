const jwt = require('jsonwebtoken')

const userAuth = async (req, res, next) => {

    const { token } = req.headers;

    if (!token) {
        return res.send({ success: false, msg: "not Authorized Login Again" })
    }
        try {
            const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.body.userId = token_decode.id
            next()
        }
        catch (error) {
            console.log(error)
            res.send({ success: false, msg: error.message })

        }
    }


module.exports = userAuth