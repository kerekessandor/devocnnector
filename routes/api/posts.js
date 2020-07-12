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
		const posts = await Post.find().sort({ date: -1 });

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
			return res.status(400).send("Post not found.");
		}

		if (post.user.toString() !== req.user.id) {
			return res.status(400).send("Not authorized.");
		}

		post.remove();

		res.status(200).send("Comment removed");
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server error");
	}
});

// @route   PUT api/posts/like/:post_id
// @desc    Like a post
// @access  Private
router.put(
	"/like/:post_id",
	auth,
	checkObjectId("post_id"),
	async (req, res) => {
		try {
			const post = await Post.findById(req.params.post_id);

			//check if the post has already been liked
			const isAlreadyLiked = post.likes.filter((item) => {
				return item.user.toString() === req.user.id;
			});

			if (isAlreadyLiked.length > 0) {
				return res.status(400).json({
					msg: "Post already liked",
				});
			}

			post.likes.unshift({
				user: req.user.id,
			});

			await post.save();

			res.json(post.likes);
		} catch (error) {
			console.error(error.message);
			return res.status(500).send("Server error");
		}
	}
);

// @route   DELETE api/posts/unlike/:post_id
// @desc    Like a post
// @access  Private
router.delete(
	"/unlike/:post_id",
	auth,
	checkObjectId("post_id"),
	async (req, res) => {
		try {
			const post = await Post. findById(req.params.post_id);

			const isLiked = post.likes.filter((item) => {
				return item.user.toString() === req.user.id;
			})

			if (isLiked.length === 0) {
				return res.status(400).send(false);
			}

			post.likes = post.likes.filter((item) => {
				return item.user.toString() !== req.user.id;
			})

			await post.save();

			return res.status(200).json(post);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server error');
		}
	}
);

//!TODO add comment routes

module.exports = router;
