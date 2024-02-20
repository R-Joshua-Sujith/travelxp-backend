const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const UserModel = require('./models/User');
const GoogleUserModel = require('./models/GoogleUser')
const SurveyFormModel = require("./models/SurveyForm")

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successful"))
    .catch((err) => console.log(err))


app.get("/", async (req, res) => {
    try {
        res.send("Travel XP Backend")
    } catch (err) {
        res.status(500).json(err);
    }
})

app.post("/signup", async (req, res) => {

    const user = await UserModel.findOne({ email: req.body.email, });
    if (user) {
        return res.status(409).json({ message: 'Account with email already exists' });
    }

    const newUser = new UserModel({
        user_type: req.body.user_type,
        user_name: req.body.user_name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
    })

    try {
        const savedUser = await newUser.save();
        res.status(201).json({
            message: `Account Created Successfully`
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Server Error'
        })
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({
            email
        })
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        if (password != user.password) {
            return res.status(401).json({
                message: 'Invalid Credentials'
            })
        }
        res.status(200).json({ message: `Login Successful` })
    }
    catch (error) {
        res.status(500).json({
            message: 'Server Error'
        })
    }
})

app.post("/googleSignUp", async (req, res) => {
    try {
        const { user_name, email, user_type } = req.body;
        const existingUser = await GoogleUserModel.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' })
        }

        const newUser = new GoogleUserModel({ user_type, user_name, email })
        await newUser.save();

        res.status(201).json({ message: "Registration Successful" });
    }
    catch (error) {
        res.status(500).json({
            message: 'Server Error'
        })
    }

})

app.post("/submitFormData", async (req, res) => {
    try {
        const newForm = new SurveyFormModel({
            user_type: req.body.user_type,
            user_email: req.body.user_email,

            step1_1: req.body.step1_1,
            step1_2: req.body.step1_2,
            step1_3: req.body.step1_3,

            step2_1: req.body.step2_1,
            step2_2: req.body.step2_2,

            step3_1: req.body.step3_1,
            step3_2: req.body.step3_2,

            step4_1: req.body.step4_1,
            step4_2: req.body.step4_2,

            step5_1: req.body.step5_1,
            step5_2: req.body.step5_2,

            submittedDateTime: new Date()
        })
        await newForm.save();

        res.status(200).json({ message: "Form Submitted Successfully" });
    }
    catch (error) {
        res.status(500).json({
            message: 'Server Error'
        })
    }
})


app.listen(5000, () => {
    console.log("Backend Server is Running");
})
