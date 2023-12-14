
const express = require("express")
const cors = require("cors")



const app = express()

app.use(express.json())
app.use(cors())


const {connection} = require("./config/db")
const {userRouter} = require("./route/user.route.js")
const {doubtRouter} = require("./route/doubt.route")
const {tutorRouter} = require("./route/tutor.route")


app.use("/",userRouter)
app.use("/doubt",doubtRouter)
app.use("/",tutorRouter)


app.get("/", (req,res)=>{

    
    res.send("welcome to my app")
    
})

app.listen(3000,async ()=>{

    try {
        await connection
        console.log("connected to database")
    } catch (error) {
        console.log(error)
    }
    console.log("connected to port 3000")
})