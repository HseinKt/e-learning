const mongoose = require("mongoose")

const withdrawalSchema = new mongoose.Schema({
    status : {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"  
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true
    },
})

const Withdrawal = mongoose.model("Withdrawal",withdrawalSchema)
module.exports = Withdrawal