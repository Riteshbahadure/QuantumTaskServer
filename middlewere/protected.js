const jwt = require("jsonwebtoken")
exports.userProteced = (req, res, next) => {
    const { user } = req.cookies
    if (!user) {
        return res.status(401).json({ message: "No Cookie Found", error: err.message })
    }

    jwt.verify(user, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            console.log(error)
            return res.status(401).json({ message: "Invalid Token" })
        }
        req.loggedInUser = decode.userId
        next()
    })

}