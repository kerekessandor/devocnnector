import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";

const Posts = ({ getPosts, post }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return post.loading ? (
		<Spinner />
	) : (
		<Fragment>
			<div className='container'>
				<div className='w-md-80 text-center mx-md-auto mb-9'>
					<h2>News</h2>
					<p>Discover your perfect program in our courses.</p>
				</div>
				<div className='row mb-5'>
					{post.posts.map((item) => {
						return <PostItem key={item._id} post={item} />;
					})}
				</div>
			</div>
		</Fragment>
	);
};

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
