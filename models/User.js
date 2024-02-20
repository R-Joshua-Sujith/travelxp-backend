const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        user_type: { type: String, required: true },
        user_name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
    }
)

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;