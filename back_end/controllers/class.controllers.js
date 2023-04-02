const {Class, ClassUser} = require("../models/classModel")
const User = require("../models/userModel")

exports.enrollClass = async (req, res) => {
    const { class_id } = req.params;
    const { user_id } = req.body;

    const existingUser = await User.findById({user_id});
    const existingClass = await Class.findById({class_id});

    if (!existingClass || !existingUser) return res.status(404).json({
        message: "User or Class not Found",
    })

    const existingEnrollment = await ClassUser.findOne({user_id, class_id})

    if ( existingEnrollment ) return res.status(409).json({
        message: "User already enrolled in this class"
    })
    
    const classUser = new ClassUser();
    classUser.user_id = user_id,
    classUser.class_id = class_id,

    await classUser.save();

    const { user_id: userID, class_id: classID } = classUser.toJSON();
    res.status(201).json({userID, classID});
}

