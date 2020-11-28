const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const router = express.Router();
const Workout = require('../../models/Workout');

// @route     POST api/workouts
// @desc      Create a workout
// @acess     Private
router.post('/', [auth, [
  check('name', 'Name is required').not().isEmpty(),
  check('exercises', 'At least one exercise is required').isArray({ min: 1 }),
  check('exercises.*.name', 'Exercise must have a name').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const newWorkout = new Workout({
      name: req.body.name,
      exercises: req.body.exercises,
      public: req.body.public ? req.body.public : false,
      user: req.user.id,
    });

    const workout = await newWorkout.save();

    res.json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
