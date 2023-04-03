const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {

    try {
        const token = req.headers.authorization?.split(" ")[1]
        
        if( !token ) return res.status(403).json({
            message: "Unauthenticated"
        })

        const decode = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findById(decode.id, "-password")

        req.user_id = decode.id
        req.user = user
        
        next()
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}