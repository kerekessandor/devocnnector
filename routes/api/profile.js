const router = require("express").Router();
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");
const { check, validationResult, oneOf } = require("express-validator");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const config = require("config");
const axios = require("axios").default;

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
			return res.status(400).json({ errors: errors.array() });
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
			profileFields.skills = Array.isArray(skills)
				? skills
				: skills.split(",").map((skill) => skill.trim());
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

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
	"/experience",
	auth,
	check("title", "Title is required").not().isEmpty(),
	check("company", "Company is required").not().isEmpty(),
	check("from", "From date is required").not().isEmpty(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		} = req.body;

		const newExp = {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		};

		try {
			const profile = await Profile.findOne({
				user: req.user.id,
			}).populate("user", ["name", "email"]);

			profile.experience.unshift(newExp);

			await profile.save();

			res.json(profile);
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Server Error");
		}
	}
);

//TODO Make an update route

// @route   Delete api/profile/experience/:exp_id
// @desc    Remove experience
// @access  Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		if (!profile) {
			return res.status(400).send("Profile not found");
		}

		profile.experience = profile.experience.filter((item) => {
			return item._id.toString() !== req.params.exp_id;
		});

		await profile.save();

		res.json(profile);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server error");
	}
});

// @route   PUT api/profile/education
// @desc    Add education
// @access  Private
router.put(
	"/education",
	auth,
	check("school", "School is required").not().isEmpty(),
	check("degree", "Degree is required").not().isEmpty(),
	check("fieldofstudy", "Field of study is required").not().isEmpty(),
	check("from", "From date is required").notEmpty(),
	async (req, res) => {
		const error = validationResult(req);

		if (!error.isEmpty()) {
			res.status(400).json({ error: error.array() });
		}

		try {
			const dBProfile = await Profile.findOne({ user: req.user.id });

			if (!dBProfile) {
				res.status(400).send("Profile doesn't exists");
			}

			const {
				school,
				degree,
				fieldofstudy,
				from,
				to,
				current,
				description,
			} = req.body;

			const educationModel = {
				school,
				degree,
				fieldofstudy,
				from,
				to,
				current,
				description,
			};

			dBProfile.education.unshift(educationModel);

			await dBProfile.save();
			res.json(dBProfile);
		} catch (error) {
			console.error(error.message);
			return res.status(500).send("Server Error");
		}
	}
);

// @route   Delete api/profile/education
// @desc    Remove profile education
// @access  Private
router.delete(
	"/education/:edu_id",
	auth,
	checkObjectId("edu_id"),
	async (req, res) => {
		try {
			const dBProfile = await Profile.findOne({ user: req.user.id });

			if (!dBProfile) {
				res.status(400).send("Profile doesn't exists");
			}

			dBProfile.education = dBProfile.education.filter((item) => {
				return item._id.toString() !== req.params.edu_id;
			});

			await dBProfile.save();
			res.status(200).json(dBProfile);
		} catch (error) {
			console.error(error);
			res.status(500).send("Server Error");
		}
	}
);

// @route   GET api/profile/github/:username
// @desc    Get user repos from github
// @access  Private
router.get("/github/:username", async (req, res) => {
	try {
		const uri = encodeURI(
			`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
		);
		const headers = {
			"user-agent": "node.js",
			Authorization: `token ${config.get("githubToken")}`,
		};

		try {
			const githubResponse = await axios.get(uri, { headers });
			res.status(200).json(githubResponse.data);
		} catch (error) {
			console.error(error.message);
			res.status(400).send("No github repo found.");
		}
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
