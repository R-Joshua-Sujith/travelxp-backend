const mongoose = require("mongoose");

const SurveyFormSchema = new mongoose.Schema({
    user_type: { type: String, required: true },
    user_email: { type: String, required: true },

    step1_1: { type: [String], required: true },
    step1_2: { type: String, required: true },
    step1_3: { type: String, required: true },

    step2_1: { type: [String], required: true },
    step2_2: { type: String, required: true },

    step3_1: { type: String, required: true },
    step3_2: { type: String, required: true },

    step4_1: { type: [String], required: true },
    step4_2: { type: String, required: true },

    step5_1: { type: String, required: true },
    step5_2: { type: String, required: true },

    submittedDateTime: { type: Date, requierd: true }

})

const SurveyFormModel = mongoose.model("surveyFormData", SurveyFormSchema);

module.exports = SurveyFormModel;