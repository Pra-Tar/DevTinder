const Connection = require("../models/Connection")

exports.validConnection = async (req, res, next)=>{
    const requestUserId = req.params.userId;
    const loginUserId = req.user._id

    try {
        const isConnectionPresent = await Connection.findOne({fromUserId: requestUserId, toUserId: loginUserId})
        if(!isConnectionPresent){
            res.send("Request not found!")
        }
        req.connectionDocument = isConnectionPresent
        next()
    } catch (err) {
        console.log(err);
        res.status(401).json("Something went wrong!")
    }
   
}
