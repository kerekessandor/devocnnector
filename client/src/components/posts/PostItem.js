import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const PostItem = ({ auth, post }) => {
	return (
		<div className='col-md-6 col-lg-4 mb-5'>
			<div className='card border h-100'>
				<div className='card-body'>
					<small className='d-block small font-weight-bold text-cap mb-2'>
						{post.user.name}
					</small>

					<div className='mb-3'>
						<h3>
							<a className='text-inherit' href='course-description.html'>
								{post.name}
							</a>
						</h3>
					</div>

					<div className='d-flex align-items-center'>
						<div className='avatar-group'>
							<a
								className='avatar avatar-xs avatar-circle'
								data-toggle='tooltip'
								data-placement='top'
								title=''
								href='#!'
								data-original-title='Nataly Gaga'
							>
								<img
									className='avatar-img'
									src={post.avatar}
									alt={post.user.name}
								/>
							</a>
						</div>
						<div className='d-flex align-items-center ml-auto'>
							<div className='small text-muted'>
								<i className='fa fa-clock d-block d-sm-inline-block mb-1 mb-sm-0 mr-1'></i>
								<Moment format='YYYY/MM/DD'>{post.date}</Moment>
							</div>
						</div>
					</div>
					<div className='d-flex align-items-center'>
						<div className='d-flex align-items-center ml-auto'>
							<button className='btn btn-light'>
								<i className='fas fa-thumbs-up'></i>
								{post.likes.length > 0 && (
									<span className='ml-3'>{post.likes.length}</span>
								)}
							</button>
							<button className='btn btn-light'>
								<i className='fas fa-thumbs-down'></i>
							</button>
							<Link to={`/post/${post._id}`} className='btn btn-sm btn-primary'>
								Discussion {post.comments.length > 0 && (
                                    <span className='count'>{post.comments.length}</span>
                                )} 
							</Link>
							{!auth.loading && auth.isAuthenticated && post.user._id === auth.user._id && (
								<button className='btn btn-sm btn-danger'>
									<i className='fas fa-times'></i>
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {})(PostItem);
