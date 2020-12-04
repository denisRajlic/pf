const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const router = express.Router();
const User = require('../../models/User');
const Workout = require('../../models/Workout');

// @route     POST api/workouts
// @desc      Create a workout
// @acess     Private
router.post('/', [auth, [
  check('title', 'Workout title required').not().isEmpty(),
  check('exercises', 'At least one exercise is required').isArray({ min: 1 }),
  check('exercises.*.name', 'Exercise must have a name').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const newWorkout = new Workout({
      title: req.body.title,
      exercises: req.body.exercises,
      isPublic: req.body.isPublic ? req.body.isPublic : false,
      user: req.user.id,
    });

    const workout = await newWorkout.save();

    res.json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/workouts
// @desc      Get workouts by user id
// @acess     Private
router.get('/', auth, async (req, res) => {
  try {
    const workout = await Workout.find({ user: req.user.id }).populate('user', ['name'], User);
    if (!workout) return res.json({ msg: 'Workout not found' });
    return res.json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
