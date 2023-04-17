const Class = require("../models/classModel")
const User = require("../models/userModel")
const Withdrawal = require("../models/withdrawalModel")

exports.enrollClass = async (req, res) => {
    const { class_id } = req.body;
    const { user_id } = req;

    try {
        const existingUser = await User.findById(user_id);
        const existingClass = await Class.findById(class_id);
        
        if (!existingClass || !existingUser) return res.status(404).json({
            message: "User or Class not Found " + user_id,
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

    if( course.users == [] ) return res.status(404).json({
        message: "class doesn't have any students"
    })

    res.status(201).json({
        class_id,
        message: "Enrolled students fetched successfully",
        students: course.users
    })
}

exports.getAllClassesEnrolled = async (req, res) => {

    const { user_id } = req;
    const user = await User.findById(user_id);

    if( !user )  return res.status(404).json({
        message: "student doesn't exist"
    })

    if( user.classes == [] ) return res.status(404).json({
        message: "Student doesn't have any classes",
        user: user
    })

    res.status(201).json({
        user_id,
        message: "Enrolled Classes fetched successfully",
        Courses: user.classes
    })
}

exports.withdrawalForm = async (req, res) => {
    const { class_id } = req.params;
    const { user_id } = req;

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

    res.status(201).json({
        message: "User withdrew from class successfully"
    })
}

exports.withdrawalApprove = async ( req, res ) => {
    const {withdrawal_id} = req.params;
    const {status} = req.body;

    try {
        const withdrawal = await Withdrawal.findById(withdrawal_id)
        if( !withdrawal ) return res.status(404).json({
            message : "Withdrawal not found"
        })
        
        withdrawal.status = status
        const { user_id, class_id } = withdrawal;
        if( status == "approved") {

            const studentClasses = await User.updateOne(
                { _id: user_id },
                { $pull: {classes: class_id} }  
            )
            // The $pull operator is used to remove the specified value from the array field. In this case, we are removing class_id from the classes array of the student document, and user_id from the users array of the course document.
            const courseUsers = await Class.updateOne(
                { _id: class_id},
                { $pull: {users: user_id} }
            )
            
        }

        const updateWithdrawal = await Withdrawal.findOneAndUpdate(
            { _id: withdrawal_id },
            withdrawal,
            { new: true}
        )

        res.status(200).json({
            message: "Withdrawal updated successfully",
            withdrawal: updateWithdrawal
        })

    } catch (error) {
        return res.status(500).json({
            message: "Server error " 
        })
    }
}

exports.getCourses = async (req, res) => {

    const course = await Class.find();

    if (!course) {
        return res.status(404).json({
            message: "Courses not found",
        })
    }

    res.status(201).json({
        message: "Courses fetched successfully",
        courses: course
        // courses: course[0].name
    })
}
