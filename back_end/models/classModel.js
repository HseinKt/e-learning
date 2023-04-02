const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        default: Date.now,
    },
    end_date: {
        type: Date,
    }
})

const classUserSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true,
    }
})

const Class = mongoose.model("Class",classSchema);
const classUser = mongoose.model("ClassUser", classUserSchema);

module.exports = {Class, classUser};