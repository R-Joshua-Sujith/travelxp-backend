const mongoose = require("mongoose");

const GoogleUserSchema = new mongoose.Schema({
    user_type: { type: String, required: true },
    user_name: { type: String, required: true },
    email: { type: String, required: true },
})

const GoogleModel = mongoose.model("googleUsers", GoogleUserSchema);

module.exports = GoogleModel;