const router = require("express").Router();
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

// @route   POST api/posts
// @desc    Add a post
// @access  Private
router.post(
	"/",
	auth,
	check("text", "Text is required").notEmpty(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ error: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select("-password");

			const newPost = new Post({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			});

			const post = await newPost.save();
			res.json(newPost);
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Server error");
		}
	}
);

// @route   Get api/posts
// @desc    Get all posts
// @access  Private
router.get("/", auth, async (req, res) => {
	try {
		const posts = await Post.find()
			.sort({ date: -1 });

		res.status(200).json(posts);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server error");
	}
});

//TODO Get post by id

// @route   Delete api/posts/:post_id
// @desc    Delete post
// @access  Private
router.delete("/:post_id", auth, checkObjectId("post_id"), async (req, res) => {
	try {
        const post = await Post.findById(req.params.post_id);
        if (!post) {
            return res.status(400).send('Post not found.');
        }

        if(post.user.toString() !== req.user.id){
            return res.status(400).send('Not authorized.');
        }

        post.remove();

		res.status(200).send("Comment removed");
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;
