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
