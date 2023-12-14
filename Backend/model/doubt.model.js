const mongoose = require('mongoose');


const doubtSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true }, 
  doubtSubject: { type: String, required: true },
  doubtDetails: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});


const DoubtModel = mongoose.model("Doubt", doubtSchema);

module.exports = {DoubtModel};
