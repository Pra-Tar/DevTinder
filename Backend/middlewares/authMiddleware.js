const jwt = require("jsonwebtoken")
const {User} = require("../models/User")

exports.protect = async (req, res, next)=>{
    const token = req.cookies.Token;
    if(!token){
        return res.status(401).json({ message: "Token not found." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: "Token failed or expired" });
    }
}