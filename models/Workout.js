const mongoose = require('mongoose');

const { Schema } = mongoose;
const WorkoutSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  exercises: [
    {
      name: {
        type: String,
        required: true,
      },
      bodypart: {
        type: String,
        default: 'Other',
      },
      sets: {
        type: String,
        default: '',
      },
      reps: {
        type: String,
        default: '',
      },
      weight: {
        type: String,
        default: 'Bodyweight',
      },
      comment: {
        type: String,
        default: 'No comment',
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  public: {
    type: Boolean,
    default: false,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Workout = mongoose.model('workout', WorkoutSchema);

module.exports = Workout;
