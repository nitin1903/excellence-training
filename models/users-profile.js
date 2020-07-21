const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersProfileSchema = new Schema({
    user_id: {type: mongoose.Types.ObjectId, required: true},
    dob: {type: Date, required: true},
    mobileNumber: {type: Number, required: true}
})

const UsersProfile = module.exports = mongoose.model('UsersProfile', usersProfileSchema);