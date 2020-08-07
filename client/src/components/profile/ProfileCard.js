import React from "react";
import PropTypes from "prop-types";

const ProfileCard = ({ profile: { profile } }) => {
	return (
		<div className='card p-1 mb-4'>
			<div className='card-body text-center'>
				<div className='mb-3'>
					<img
						className='u-lg-avatar rounded-circle'
						src={profile.user.avatar}
						alt={profile.user.name}
					/>
				</div>

				<div className='mb-3'>
					<h1 className='h6 font-weight-medium mb-0'>{profile.user.name}</h1>
					<small className='d-block text-muted'>{profile.status}</small>
				</div>

				<div className='mb-2'>
					<a
						className='btn btn-sm btn-soft-primary transition-3d-hover'
						href='#!'
					>
						<span className='far fa-envelope mr-2'></span>
						Send a Message
					</a>
				</div>

				<a className='text-secondary small' href='#!'>
					<i className='far fa-flag mr-1'></i> Report this user
				</a>
			</div>
		</div>
	);
};

ProfileCard.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileCard;
