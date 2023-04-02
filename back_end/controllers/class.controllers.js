const Class = require("../models/classModel")
const User = require("../models/userModel")

exports.enrollClass = async (req, res) => {
    const { class_id } = req.params;
    const { user_id } = req.body;
    // const { class_id, user_id } = req.body;

    try {
        const existingUser = await User.findById(user_id);
        const existingClass = await Class.findById(class_id);
        
        if (!existingClass || !existingUser) return res.status(404).json({
            message: "User or Class not Found",
        })


        if( existingUser.classes.includes(class_id) ) {
            return res.status(409).json({
                message: "User already enrolled in this class"
            })
        }

        // const findClass = await existingUser.classes.find(class_id);
        // const findUser = await existingClass.users.find(user_id);
        // if ( findClass && findUser ) return res.status(409).json({
        //     message: "User already enrolled in this class"
        // })

        existingUser.classes.push(class_id);
        await existingUser.save();

        existingClass.users.push(user_id);
        await existingClass.save();

        res.status(201).json({
            message: "User enrolled in class successfully",
            user_id,
            class_id
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "catch message: "+err.message
        })
    }
}

exports.addClass = async (req, res) => {
    const { name, description } = req.body;

    const existingClass = await Class.findOne({name});

    if ( existingClass ) return res.status(409).json({
        message: "Class already exists"
    })

    const newClass = new Class();
    newClass.name = name;
    newClass.description = description;

    await newClass.save();

    res.json(newClass);
}