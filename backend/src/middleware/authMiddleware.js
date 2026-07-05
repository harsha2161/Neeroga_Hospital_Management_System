const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
    console.log(req.body)
    const tokenString = req.header("Authorization")
    if (tokenString != null && tokenString.startsWith("Bearer ")) {
    
        const token = tokenString.split(" ")[1]
        jwt.verify(token, process.env.JWT_KEY, {
            algorithms: ['HS256'] 
        }, (error, decoded) => {
            
            if (error) {
                console.log("Invalid or expired token:", error.message)
                return res.status(401).json({ message: "Not authorized, invalid token" })
            }
            
            req.user = decoded
            next()
        })
    } else {
        return res.status(401).json({ message: "Not authorized, no token provided" })
    }
}

module.exports = { protect }