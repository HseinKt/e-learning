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
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]
})

const Class = mongoose.model("Class",classSchema);

module.exports = Class;