const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const router = express.Router();
const User = require('../../models/User');
const Workout = require('../../models/Workout');

// @route     POST api/workouts
// @desc      Create or update a workout
// @acess     Private
router.post('/', [auth, [
  check('title', 'Workout title required').not().isEmpty(),
  check('exercises', 'At least one exercise is required').isArray({ min: 1 }),
  check('exercises.*.name', 'Exercise must have a name').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    let workout = await Workout.findOne({ _id: req.body._id });

    if (workout) {
      // Check if user is authorized for this action
      if (workout.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });

      // Update
      workout = await Workout.findOneAndUpdate(
        { _id: req.body._id },
        {
          $set: {
            title: req.body.title,
            exercises: req.body.exercises,
            isPublic: req.body.isPublic,
          },
        },
        { new: true },
      );

      return res.json(workout);
    }

    // Create
    const newWorkout = new Workout({
      title: req.body.title,
      exercises: req.body.exercises,
      isPublic: req.body.isPublic ? req.body.isPublic : false,
      user: req.user.id,
    });

    workout = await newWorkout.save();

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
    const workout = await Workout.find({ user: req.user.id }).sort({ date: -1 }).populate('user', ['name'], User);
    if (!workout) return res.json({ msg: 'Workout not found' });
    return res.json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/workouts/:id
// @desc      Get workout by id
// @acess     Private
router.get('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('user', ['name'], User);
    if (!workout) return res.json({ msg: 'Workout not found' });
    return res.json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/workouts/:id
// @desc      Delete workout
// @acess     Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.json({ msg: 'Workout not found!' });

    // Check user
    if (workout.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });

    await workout.remove();

    return res.json({ msg: 'Workout removed' });
  } catch (err) {
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Workout not found' }); // This runs if the ID passed in is not a valid object id
    res.status(500).send('Server Error');
  }
});

module.exports = router;
