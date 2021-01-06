const express = require('express');
const auth = require('../../middleware/auth');

const router = express.Router();
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route     GET api/profile
// @desc      Get profiles by user id
// @acess     Private
router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'surname'], User);
    if (!profile) return res.status(400).json({ msg: 'Profile not found' });
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/profile
// @desc      Create profile or update
// @acess     Private
router.post('/', auth, async (req, res) => {
  const {
    birthDate, weight, gender, height,
  } = req.body;

  const profileFields = {
    user: req.user.id,
    birthDate,
    weight,
    gender,
    height,
  };

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true },
      );

      return res.json(profile);
    }

    // Create
    profile = new Profile(profileFields);

    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
