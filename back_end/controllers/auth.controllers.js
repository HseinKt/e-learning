const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const {name, email, password, role } = req.body;

    const existingUser = await User.findOne({email});

    if( existingUser ) return res.status(409).json({
        message: "Email already exists"
    })

    const user = new User();
    user.email = email;
    user.name = name;
    user.password = password;

    if( role ) user.role = role;

    await user.save();

    const {password: hashedPassword, ...newUser} = user.toJSON();
    res.status(201).json(newUser);
}

exports.login = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (!user) return res.status(404).json({
        message: "Invalid Credentials" 
    })

    if(!user.matchPassword(password)) return res.status(404).json({
        message: "Invalid Credentials"
    })
    
    const token = jwt.sign({id: user.id, email: user.email},process.env.SECRET_KEY);
    const {password: hashedPassword, ...newUser} = user.toJSON();

    res.json({newUser, token})
}