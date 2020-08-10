const router = require("express").Router();
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const { sendConfirmationEmail } = require("../../email/emailServices");

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password, -image");
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// newPassword,
// 	confirmPassword
// @route   Post api/auth/resetpassword
// @desc    Reset Password
// @access  Private
router.post(
	"/resetpassword",
	auth,
	[
		check("password", "Old password is required").not().isEmpty(),
		check("newPassword", "New passord is required").not().isEmpty(),
		check("confirmPassword", "Confirm password is required").not().isEmpty(),
	],
	async (req, res) => {
		const validationError = validationResult(req);

		if (!validationError.isEmpty()) {
			return res.status(400).json({ errors: validationError.array() });
		}

		const { password, newPassword, confirmPassword } = req.body;

		if (newPassword !== confirmPassword) {
			return res.status(400).json({
				errors: [{ msg: "Passwords do not match." }],
			});
		}

		if (password === newPassword) {
			return res.status(400).json({
				errors: [{ msg: "New password is the same as old password." }],
			});
		}

		try {
			const dbUser = await User.findById(req.user.id);

			if (!dbUser) {
				return res.status(400).json({
					errors: [{ msg: "Invalid credentials" }],
				});
			}

			const compareResult = await bcrypt.compare(password, dbUser.password);

			if (!compareResult) {
				return res.status(400).json({
					errors: [{ msg: "Invalid credentials" }],
				});
			}

			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(newPassword, salt);

			const updateResponse = await User.findOneAndUpdate(
				{ _id: req.user.id },
				{ password: hashedPassword }
			);

			res.send("success");
		} catch (err) {
			console.error(err.message);
			res.status(500).json("Server error");
		}
	}
);

// @route   Get api/auth/confirm
// @desc    Confirm users email
// @access  Public
router.get("/confirm/:user_id", async (req, res) => {
	try {
		const dBUser = await User.findById(req.params.user_id).select('-password, -image');

		if (dBUser === null) {
			return res.status(400).json({
				errors: [{ msg: "Profile not found." }],
			});
		}

		dBUser.confirmed = true;

		dBUser.save();

		res.status(200).json();
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// @route   Get api/auth/confirm
// @desc    Send Confirm users email
// @access  Public

router.get("/sendconfirm", auth, async (req, res) => {
	try {
		const dBuser = await User.findById(req.user.id);

		if (dBuser === null) {
			return res.status(400).json({
				errors: [
					{
						msg: "Profile not found",
					},
				],
			});
		}

		sendConfirmationEmail(req.user.id, dBuser.email, dBuser.name);

		res.send('Success');
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server error");
	}
});

// @route   Post api/auth
// @desc    Authenticate the user
// @access  Public
router.post(
	"/",
	[
		check("email", "Email is required").isEmail(),
		check("password", "Password is required").exists(),
	],
	async (req, res) => {
		const validationErrors = validationResult(req);

		if (!validationErrors.isEmpty()) {
			return res.status(400).json({ errors: validationErrors.array() });
		}

		const { email, password } = req.body;

		try {
			const dBUser = await User.findOne({ email: email });

			if (!dBUser) {
				return res.status(400).json({
					errors: [{ msg: "Invalid credentials" }],
				});
			}

			// if (!dBUser.confirmed) {
			// 	return res.status(400).json({
			// 		errors: [
			// 			{
			// 				msg: "Please confirm your email address.",
			// 			},
			// 		],
			// 		isConfirmed: false,
			// 	});
			// }

			const compareResult = await bcrypt.compare(password, dBUser.password);

			if (!compareResult) {
				return res.status(400).json({
					errors: [
						{
							msg: "Invalid credentials",
						},
					],
				});
			}

			const payload = {
				user: {
					id: dBUser.id,
				},
			};

			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{
					expiresIn: 360000,
				},
				(err, token) => {
					if (err) {
						throw err;
					} else {
						return res.send({ token });
					}
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(401).json("Server error");
		}
	}
);

module.exports = router;
