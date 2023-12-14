const express = require('express');
const tutorRouter = express.Router();
const {TutorModel} = require("../model/tutor.model"); 
const {auth} = require("../middleware/auth")

// Create a new tutor availability record
tutorRouter.post('/post', auth,async (req, res) => {
  try {
    const { tutorId } = req.body;
    const newAvailability = new TutorModel({ tutorId });

    await newAvailability.save()
    res.status(201).json(newAvailability);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

tutorRouter.get('/availability',auth, async (req, res) => {
    try {
      const availabilities = await TutorModel.find();
      res.status(200).json(availabilities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


  tutorRouter.patch("/edit/:tutorID",auth,async(req,res)=>{

    
    const tutorID = req.params.tutorID
    const Userid = req.body.userId

    const tutor = await TutorModel.findOne({tutorId:tutorID})

    if(Userid == tutor.tutorID){
        await TutorModel.findByIdAndUpdate({tutorId:tutorID})
        res.send("tutor updated successfully")
    }else{
        res.send("not authorised")
    }

    

})

module.exports = {tutorRouter};