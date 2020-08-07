const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../models/User");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
	"/register",
	[
		check("email", "Email is invalid").isEmail(),
		check("name", "Name is required").not().isEmpty(),
		check("password", "Password length is not correct").isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
			});
		}

		const { name, email, password } = req.body;

		try {
			//See if the user exists
			let user = await User.findOne({
				email: email,
			});

			if (user) {
				return res.status(400).json({
					error: [
						{
							msg: "User already exists",
						},
					],
				});
			}

			//Get Users gravatar based on the email that is uniqe
			const avatar = gravatar.url(email, {
				s: "200",
				r: "pg",
				d: "mm",
			});

			user = new User({
				name,
				email,
				avatar,
				password,
				confirmed: false
			});

			//Encrypt the passwrod using bcrypt
			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{
					expiresIn: 360000,
				},
				(error, token) => {
					if (error) throw error;
					res.json({ token });
				}
			);
		} catch (err) {
			console.log(err.message);
			res.status(500).send("server error");
		}
		//Return the jsonwebtoken
	}
);

module.exports = router;
