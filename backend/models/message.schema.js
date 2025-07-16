const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        sentiment: { type: String, default: "pending" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
