const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

    username: { type: String, unique: true, required: true },
    userType: { type: String, enum: ['Student', 'Tutor'], required: true },
    userLanguage: { type: String, required: true },
    subjectExpertise: { type: String, default: null }, 
    classGrade: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },


})

const UserModel = mongoose.model("user", userSchema)

module.exports = {
    UserModel
}