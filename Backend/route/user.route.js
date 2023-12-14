
const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const fs = require("fs")

const userRouter = express.Router()
require('dotenv').config()
const {UserModel}  = require("../model/user.model.js")

// -------------------------------Register-----------------------------------------

userRouter.post("/register",async (req,res)=>{

    let { username,userType,userLanguage,subjectExpertise, classGrade,email,password} = req.body

    bcrypt.hash(password, 6, async function(err, hash) {
        // Store hash in your password DB.

        if(err){
            console.log({"error in hashing":err})
        }else{

            const user = new UserModel({email,password:hash,userLanguage,userType,username,subjectExpertise,classGrade})
            await user.save()
            res.send("signup successful")
        }
    });
})

// -------------------------------Login-----------------------------------------

userRouter.post("/login",async (req,res)=>{

    const {email,password} = req.body

    try {
        
        const user = await UserModel.find({email})
        
        if(user.length>0){
            const hash_password = user[0].password

            bcrypt.compare(password, hash_password, function(err, result) {
                // result == true
                if(result){

                    const token = jwt.sign({ "userId":user[0]._id }, process.env.secret_key);

                    res.send({"msg":"login successfull","token":token})
                }else{
                    res.send("login failed")
                }
            });
        }else{
            res.send("user not found")
        }

    } catch (error) {
        console.log(error)
    }
})

// -------------------------------Logout-----------------------------------------

userRouter.post("/logout",async(req,res)=>{
    let token = req.headers.authorization

    try {

        let blacklist = JSON.parse(fs.readFileSync("./blacklist.json","utf-8"))

        blacklist.push(token)
        fs.writeFileSync("./blacklist.json",JSON.stringify(blacklist))
        res.send("logout successfull")
        
    } catch (error) {
        console.log(error)
    }
})







module.exports = {userRouter}