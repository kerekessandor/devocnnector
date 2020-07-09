const router = require('express').Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { db } = require('../../models/Profile');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private

router.get('/me', auth, async (req, res) => {
    try {
        const dbProfile = await Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar']);

        if (!dbProfile) {
            return res.status(400).json({msg: 'There is no profile for this user'});
        }

        res.json(dbProfile);

    } catch(err) {
        console.error(err.message);
        return res.status(500).json('Server error');
    }
});

module.exports = router;