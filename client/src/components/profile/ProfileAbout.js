import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileAbout = ({ profile: { profile } }) => {
	return (
		<Fragment>
			<div className='mb-4'>
				<h2 className='h4'>{profile.user.name}</h2>
				<h4 className='h6 text-secondary mb-0'>
					{profile.location}
					<small>
						- Joined in <Moment format='YYYY/MM/DD'>{profile.user.date}</Moment>
					</small>
				</h4>
			</div>
			<div className='mb-4'>
				<p>{profile.bio}</p>
			</div>
			<hr className='my-7' />
			<div className='row'>
				<div className='col-md-6 col-lg-4'>
					<ul className='list-group list-group-transparent list-group-flush list-group-borderless mb-0'>
						<li className='list-group-item pt-0 pb-4'>
							<div className='media'>
								<span className='fas fa-envelope list-group-icon mr-3'></span>
								<div className='media-body text-lh-sm'>
									<span className='d-block mb-1'>Email:</span>
									<a href='#!'>{profile.user.email}</a>
								</div>
							</div>
						</li>
						{profile.website && (
							<li className='list-group-item pt-0 pb-4'>
								<div className='media'>
									<span className='fas fa-link list-group-icon mr-3'></span>
									<div className='media-body text-lh-sm'>
										<span className='d-block mb-1'>Web page:</span>
										<a href='#!'>{profile.website}</a>
									</div>
								</div>
							</li>
						)}
						{profile.location && (
							<li className='list-group-item pt-0 pb-4'>
								<div className='media'>
									<span className='fas fa-map-marker-alt list-group-icon mr-3'></span>
									<div className='media-body text-lh-sm'>
										<span className='d-block mb-1'>Location:</span>
										<a href='#!'>{profile.location}</a>
									</div>
								</div>
							</li>
						)}
					</ul>
				</div>
				<div className='col-md-6 col-lg-4'>
					<ul className='list-group list-group-transparent list-group-flush list-group-borderless mb-0'>
						<li className='list-group-item pt-0 pb-4'>
							<div className='media'>
								<span className='fas fa-building list-group-icon mr-3'></span>
								<div className='media-body text-lh-sm'>
									<span className='d-block mb-1'>Organization:</span>
									<a href='#!'>{profile.company}</a>
								</div>
							</div>
						</li>
						{profile.skills.length > 0 && (
							<li className='list-group-item pt-0 pb-4'>
								<div className='media'>
									<span className='fas fa-tags list-group-icon mr-3'></span>
									<div className='media-body text-lh-sm'>
										<span className='d-block mb-1'>Skills:</span>
										{profile.skills.map((skill) => {
											return (
												<Fragment>
													<a href='#!'>{skill} </a>
												</Fragment>
											);
										})}
									</div>
								</div>
							</li>
						)}
					</ul>
				</div>
			</div>
			<hr className='my-7'></hr>
			<div className='row mb-7'>
				{profile.experience.length > 0 && (
					<Fragment>
						<div className='col-sm-12 col-md-6 mb-7 mb-md-0'>
							<div className='mb-3'>
								<h3 className='h6 mb-0'>Work experience</h3>
							</div>
							{profile.experience.map((exp) => {
								return (
									<div className='d-flex mb-5'>
										<div>
											<small className='d-block text-secondary'>
												{exp.current ? (
													<Moment format='YYYY/MM/DD'>{exp.from}</Moment>
												) : (
													<Fragment>
														<Moment format='YYYY/MM/DD'>{exp.from}</Moment>
														{" - "}
														<Moment format='YYYY/MM/DD'>{exp.to}</Moment>
													</Fragment>
												)}
											</small>
											<h4 className='h6 mb-0'>{exp.title}</h4>
											<span className='d-block text-secondary'>
												at {exp.company}, {exp.location}
											</span>
										</div>
									</div>
								);
							})}
						</div>
					</Fragment>
				)}
				{profile.education.length > 0 && (
					<Fragment>
						<div className='col-sm-12 col-md-6 mb-7 mb-md-0'>
							<div className='mb-3'>
								<h3 className='h6 mb-0'>Education</h3>
							</div>
							{profile.education.map((ed) => {
								return (
									<div className='d-flex mb-5'>
										<div>
											<small className='d-block text-secondary'>
												{ed.current ? (
													<Moment format='YYYY/MM/DD'>{ed.from}</Moment>
												) : (
													<Fragment>
														<Moment format='YYYY/MM/DD'>{ed.from}</Moment>
														{" - "}
														<Moment format='YYYY/MM/DD'>{ed.to}</Moment>
													</Fragment>
												)}
											</small>
											<h4 className='h6 mb-0'>{ed.degree}</h4>
											<span className='d-block text-secondary'>
												at {ed.school}
											</span>
										</div>
									</div>
								);
							})}
						</div>
					</Fragment>
				)}
			</div>
		</Fragment>
	);
};

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
