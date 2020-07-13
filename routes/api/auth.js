const router = require("express").Router();
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
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

			jwt.sign(payload, config.get("jwtSecret"), {
				expiresIn: 360000,
			}, (err, token) => {
                if(err) {
                    throw err;
                } else {
                    return res.send({token});
                }
            });
		} catch (err) {
			console.error(err.message);
			res.status(401).json("Server error");
		}
	}
);

module.exports = router;
