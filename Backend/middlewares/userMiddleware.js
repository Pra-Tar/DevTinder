const {User} = require("../models/User")

exports.validUserId = async (req, res, next)=>{
    const requestUserId = req.params.userId;

    try {
        const user = await User.findById(requestUserId)
        if(!user){
            res.send("User not found!")
        }
        next()
        
    } catch (err) {
        console.log(err);
        res.status(401).json("User Id is invalid!")
    }
   
}
