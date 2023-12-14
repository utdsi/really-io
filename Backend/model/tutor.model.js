
const mongoose = require('mongoose');

const tutorAvailabilitySchema = new mongoose.Schema({
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true },
    lastPingTime: { type: Date, default: Date.now },
});

const TutorModel = mongoose.model('TutorAvailability', tutorAvailabilitySchema);

module.exports = {TutorModel}
