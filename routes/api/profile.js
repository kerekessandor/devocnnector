const router = require("express").Router();
const auth = require("../../middleware/auth");
const { check, validationResult, oneOf } = require("express-validator");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { db } = require("../../models/Profile");

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get("/me", auth, async (req, res) => {
	try {
		const dbProfile = await Profile.findOne({
			user: req.user.id,
		}).populate("user", ["name", "avatar", "email"]);

		if (!dbProfile) {
			return res.status(400).json({ msg: "There is no profile for this user" });
		}

		res.json(dbProfile);
	} catch (err) {
		console.error(err.message);
		return res.status(500).json("Server error");
	}
});

// @route   POST api/profile/
// @desc    Create or Update a user's profile
// @access  Private
router.post(
	"/",
	auth,
	[
		check("status", "Status is required").not().isEmpty(),
		check("skills", "Skills is required").not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ msg: errors.array() });
		}

		//fetch the data from the req.body
		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin,
		} = req.body;

		//Build profile object
		const profileFields = {
            user: req.user.id,
            status,
            company,
            website,
            location,
            bio,
            githubusername
        };

		if (skills) {
			profileFields.skills = skills.split(",").map((skill) => skill.trim());
        }
        
        //build social object
        profileFields.social = {
            youtube: youtube ? youtube : "",
            facebook: facebook ? facebook : "",
            twitter: twitter ? twitter : "",
            instagram: instagram ? instagram : "",
            linkedin: linkedin ? linkedin: ""
        }

        try {
            let dBProfile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true, upsert: true}
            )

            return res.json(dBProfile);
            
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
	}
);

module.exports = router;
