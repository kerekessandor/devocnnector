import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import star from "../../assets/svg/illustrations/star.svg";

const ProfileItem = ({ profile }) => {
	return (
		<div className='col-md-6 col-lg-4 mb-5'>
			<div className='card border h-100'>
				<div className='card-img-top position-relative'>
					<img
						className='card-img-top'
						src={profile.user.avatar}
						alt={profile.user.name}
					/>

					<div className='position-absolute bottom-0 left-0 mb-3 ml-4'>
						<div className='d-flex align-items-center flex-wrap'>
							<ul className='list-inline mt-n1 mb-0 mr-2'>
								<li className='list-inline-item mx-0'>
									<img src={star} alt='Review rating' width='14' />
								</li>
								<li className='list-inline-item mx-0'>
									<img src={star} alt='Review rating' width='14' />
								</li>
								<li className='list-inline-item mx-0'>
									<img src={star} alt='Review rating' width='14' />
								</li>
								<li className='list-inline-item mx-0'>
									<img src={star} alt='Review rating' width='14' />
								</li>
								<li className='list-inline-item mx-0'>
									<img src={star} alt='Review rating' width='14' />
								</li>
							</ul>
							<span className='d-inline-block'>
								<small className='font-weight-bold text-white mr-1'>4.91</small>
								<small className='text-white-70'>(1.5k+ reviews)</small>
							</span>
						</div>
					</div>
				</div>

				<div className='card-body'>
					<div className='mb-3'>
						<h3>
							<a className='text-inherit' href='course-description.html'>
								{profile.user.name}
							</a>
						</h3>
						<p>
							{profile.status}{" "}
							{profile.company && <span>at {profile.company}</span>}
						</p>
						<p className='mt-1'>
							{profile.location && <span>{profile.location}</span>}
						</p>
					</div>
					<div className='d-flex align-items-center'>
						<ul>
							{profile.skills.slice(0, 4).map((item, index) => {
								return (
									<li key={index} className='text-primary'>
										<i className='fas fa-check'>{item}</i>
									</li>
								);
							})}
						</ul>
					</div>
				</div>

				<div className='card-footer border-0 pt-0'>
					<div className='d-flex justify-content-between align-items-center'>
						<Link
							to={`/profile/${profile.user._id}`}
							className='btn btn-sm btn-primary transition-3d-hover'
						>
							View Profile
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileItem;
