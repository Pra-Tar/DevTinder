const jwt = require("jsonwebtoken")
const {User} = require("../models/User")


const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_Secret_Key, {
        expiresIn: "1h",
    })
}

// from this controller we have to export the login and register endpoint executor.

// register a new user -  
exports.register =  async (req, res)=>{
    const {name, email, password} = req.body;
    try {
        const userExists = await User.findOne({email})

        if(userExists){
            return res.status(400).json({message:"User already exists."})
        }
        const user = await User.create({name, email, password})
        // after user is created and logged in create a token.
        const token = generateToken(user._id)
        res.cookie("Token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        });
        res.status(201).json("User registered successfully!");

        // res.status(201).json({
        //     token,
        //     user:{
        //         id:user._id,
        //         name:user.name,
        //         email:user.email
        //     }
        // })
    } 
    catch (err) {
        res.status(500).json({message:"Registration failed!", error:err.message})
    }
}


exports.login = async (req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user || !(await user.matchPassword(password))){
            return res.status(401).json({message:"Invalid credentials!"})
        }
        const token = generateToken(user._id)
        res.cookie("Token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        });
        res.status(201).json(`Welcome ${user.name} <3!`);

        // res.json({
        //     token, 
        //     user:{
        //         id:user._id,
        //         name:user.name,
        //         email:user.email
        //     }
        // })
    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
}