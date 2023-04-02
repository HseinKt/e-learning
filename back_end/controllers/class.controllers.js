const Class = require("../models/classModel")
const User = require("../models/userModel")
const Withdrawal = require("../models/withdrawalModel")

exports.enrollClass = async (req, res) => {
    const { class_id } = req.params;
    const { user_id } = req.body;

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

exports.getAllUsersEnrolled = async (req, res) => {
    const { class_id } = req.params;

    const course = await Class.findById(class_id);

    if( !course )  return res.status(404).json({
        message: "class doesn't exist"
    })

    if( course.users =[] ) return res.status(404).json({
        message: "class doesn't have any students"
    })

    res.status(201).json({
        class_id,
        message: "Enrolled students fetched successfully",
        students: course.users
    })
}

exports.withdrawalForm = async (req, res) => {
    const { user_id , class_id } = req.params;

    const course = await Class.findById(class_id);
    const student = await User.findById(user_id);
    
    if( !student.classes.includes(class_id) ) {
        return res.status(409).json({
            message: "User is not enrolled in this class",
            classes: student.classes,
            users: course.users
        })
    }

    const existingWithdrawal = await Withdrawal.findOne({
        status: "pending",
        user_id,
        class_id
    })

    if ( existingWithdrawal ) {
        return res.status(409).json({
            message: "Withdrawal request already submited for this class"
        })
    }

    const withdrawal = new Withdrawal();
    withdrawal.user_id = user_id;
    withdrawal.class_id = class_id;

    await withdrawal.save();

    // student.classes = student.classes.filter((c) => c.toString() !== class_id);
    // course.users = course.users.filter((u) => u.toString() !== user_id);

    // await student.save();
    // await course.save();

    res.status(201).json({
        message: "User withdrew from class successfully"
    })
}