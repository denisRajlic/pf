const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProfileSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  height: {
    type: String,
    default: '/',
  },
  weight: {
    type: String,
    default: '/',
  },
  gender: {
    type: String,
    default: '/',
  },
  birthDate: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;
