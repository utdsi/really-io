const express = require("express")



const doubtRouter = express.Router()

const { DoubtModel } = require("../model/doubt.model")
const { auth } = require("../middleware/auth")


doubtRouter.get("/", auth, async (req, res) => {

    try {
        const doubt = await await DoubtModel.find().sort({ timestamp: -1 });

        res.status(200).send(doubt)
    } catch (error) {
        throw error
        res.status(500).json({ message: 'Internal Server Error' });
    }


})
doubtRouter.get('/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      
      const doubts = await DoubtModel.find({ userId }).sort({ timestamp: -1 });
  
      res.status(200).send(doubts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

doubtRouter.post("/create", auth, async (req, res) => {
    const payload = req.body

    try {
        const new_doubt = new DoubtModel(payload)
        await new_doubt.save()
        res.status(200).send({"msg":"doubt created successfully"})
    } catch (error) {
        throw error
        res.status(500).json({ message: 'Internal Server Error' });
    }



})


module.exports={doubtRouter}