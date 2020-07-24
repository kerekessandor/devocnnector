import React from "react";
import PropTypes from "prop-types";

const ProfileSocial = ({ social }) => {
	return (
		<div className='card mb-4'>
			<div className='card-header pt-4 pb-3 px-0 mx-4'>
				<h3 className='h6 mb-0'>Social Profiles</h3>
			</div>
			<div className='card-body pt-3 pb-4 px-4'>
				<a className='media mb-4' href={social.facebook}>
					<div className='u-sm-avatar mr-3'>
						<i className='fab fa-facebook-square'></i>
					</div>
					<div className='media-body'>
						<span className='d-block text-dark'>Facebook</span>
					</div>
				</a>
			</div>
		</div>
	);
};

ProfileSocial.propTypes = {
	social: PropTypes.object.isRequired,
};

export default ProfileSocial;
