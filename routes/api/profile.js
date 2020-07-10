const router = require("express").Router();
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");
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
			githubusername,
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
			linkedin: linkedin ? linkedin : "",
		};

		try {
			let dBProfile = await Profile.findOneAndUpdate(
				{ user: req.user.id },
				{ $set: profileFields },
				{ new: true, upsert: true }
			);

			return res.json(dBProfile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

// @route   Get api/profile/
// @desc    Get a list of all user's profile
// @access  Private
router.get("/", async (req, res) => {
	try {
		const dBProfiles = await Profile.find().populate("user", [
			"name",
			"email",
			"avatar",
		]);

		if (!dBProfiles) return res.send("No Profiles available");

		return res.send(dBProfiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

// @route   Get api/profile/user/:user_id
// @desc    Get a user's profile by Id
// @access  Private
router.get("/user/:user_id", checkObjectId("user_id"), async (req, res) => {
	try {
		const dbProfile = await Profile.findOne({
			user: req.params.user_id,
		}).populate("user", ["name", "email", "avatar"]);

		if (!dbProfile) {
			return res.status(400).json({ msg: "Profile not found." });
		}

		res.json(dbProfile);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// @route   Delete api/profile/
// @desc    Delete a profile, user & posts
// @access  Private

router.delete("/", auth, async (req, res) => {
	try {
		//delete profile
		await Profile.findOneAndRemove({ user: req.user.id });

		//delete user
		await User.findOneAndRemove({ _id: req.user.id });

		res.json({ msg: "User removed" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
