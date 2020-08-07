import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DashboardNavbar from "../layout/DashboardNavbar";
import { Link } from "react-router-dom";
import {
	createProfile,
	getCurrentProfile,
	deleteAvatar,
	uploadAvatar,
} from "../../actions/profile";

const initialState = {
	company: "",
	website: "",
	location: "",
	status: "",
	skills: "",
	githubusername: "",
	bio: "",
	twitter: "",
	facebook: "",
	linkedin: "",
	youtube: "",
	instagram: "",
	avatar: "",
};

const CreateProfile = ({
	createProfile,
	getCurrentProfile,
	deleteAvatar,
	uploadAvatar,
	profile,
	history,
	auth,
}) => {
	const [formData, setFormData] = useState(initialState);

	const [displaySocialInputs, toggleSocialInputs] = useState(false);

	useEffect(() => {
		if (!profile.profile) {
			getCurrentProfile();
		}

		if (!profile.loading && profile.profile) {
			const profileData = { ...initialState };
			for (const key in profile.profile) {
				if (key in profileData) {
					profileData[key] = profile.profile[key];
				}
			}

			for (const key in profile.profile.social) {
				if (key in profileData) {
					profileData[key] = profile.profile.social[key];
				}
			}

			if (
				profile.profile.social.facebook !== "" ||
				profile.profile.social.instagram !== "" ||
				profile.profile.social.twitter !== ""
			) {
				toggleSocialInputs(true);
			}

			setFormData(profileData);
		}
	}, [getCurrentProfile, profile.profile, profile.loading, auth]);

	const {
		company,
		website,
		location,
		status,
		skills,
		githubusername,
		bio,
		twitter,
		facebook,
		linkedin,
		youtube,
		instagram,
	} = formData;

	const socialInputsToggler = () => {
		toggleSocialInputs(!displaySocialInputs);
	};

	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		createProfile(formData, history, profile.profile ? true : false);
	};

	const onUpload = (e) => {
		e.preventDefault();
		uploadAvatar(e.target.files[0]);
	};

	const onDelete = (e) => {
		e.preventDefault();
		deleteAvatar();
	};

	const socialInputsHtml = (
		<Fragment>
			<div className='mb-5'>
				<h3 className='h5 mb-1'>Social profiles</h3>
				<p>Add elsewhere links to your profile.</p>
			</div>

			<div className='form-group'>
				<div className='input-group'>
					<div className='input-group-prepend'>
						<span className='input-group-text'>
							<i className='fab fa-instagram'></i>
						</span>
					</div>
					<input
						type='text'
						className='form-control'
						placeholder='Instagram'
						name='instagram'
						value={instagram}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<small className='form-text text-muted'>
					Input your Instagram username (e.g. alexbrown)
				</small>
			</div>

			<div className='form-group'>
				<div className='input-group'>
					<div className='input-group-prepend'>
						<span className='input-group-text'>
							<i className='fab fa-facebook-square'></i>
						</span>
					</div>
					<input
						type='text'
						className='form-control'
						placeholder='Facebook profile'
						aria-label='Facebook profile'
						name='facebook'
						value={facebook}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<small className='form-text text-muted'>
					Input your Facebook username (e.g. alexbrown)
				</small>
			</div>

			<div className='form-group'>
				<div className='input-group'>
					<div className='input-group-prepend'>
						<span className='input-group-text'>
							<i className='fab fa-twitter'></i>
						</span>
					</div>
					<input
						type='text'
						className='form-control'
						placeholder='Twitter'
						name='twitter'
						value={twitter}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<small className='form-text text-muted'>
					Input your Twitter username (e.g. alexbrown)
				</small>
			</div>

			<div className='form-group'>
				<div className='input-group'>
					<div className='input-group-prepend'>
						<span className='input-group-text'>
							<i className='fab fa-linkedin'></i>
						</span>
					</div>
					<input
						type='text'
						className='form-control'
						placeholder='Linkedin'
						name='linkedin'
						value={linkedin}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<small className='form-text text-muted'>
					Input your Linkedin username (e.g. alexbrown)
				</small>
			</div>

			<div className='form-group'>
				<div className='input-group'>
					<div className='input-group-prepend'>
						<span className='input-group-text'>
							<i className='fab fa-youtube'></i>
						</span>
					</div>
					<input
						type='text'
						className='form-control'
						placeholder='Youtube'
						name='youtube'
						value={youtube}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<small className='form-text text-muted'>
					Input your Youtube username (e.g. alexbrown)
				</small>
			</div>
		</Fragment>
	);

	return (
		<Fragment>
			<DashboardNavbar>
				<div className='bg-light'>
					<div className='container space-2'>
						<form onSubmit={(e) => onDelete(e)}>
							<div className='row'>
								<div className='media align-items-center mb-7 col-sm-12'>
									<div className='u-lg-avatar mr-3'>
										{auth.user.imageName !== null ? (
											<img
												className='img-fluid rounded-circle'
												src={`/api/profile/${auth.user._id}/avatar/${auth.user.imageName}`}
												alt={auth.user.name}
											/>
										) : (
											<img
												className='img-fluid rounded-circle'
												src={auth.user.avatar}
												alt={auth.user.name}
											/>
										)}
									</div>

									<div className='media-body'>
										<label className='btn btn-sm btn-primary transition-3d-hover file-attachment-btn mb-1 mb-sm-0 mr-1'>
											Upload New Picture
											<input
												id='fileAttachmentBtn'
												name='file-attachment'
												type='file'
												className='file-attachment-btn__label'
												onChange={(e) => onUpload(e)}
											/>
										</label>

										<button
											type='submit'
											className='btn btn-sm btn-soft-secondary transition-3d-hover mb-1 mb-sm-0'
										>
											Delete
										</button>
									</div>
								</div>
							</div>
						</form>
						<form onSubmit={(e) => onSubmit(e)}>
							<div className='row'>
								<div className='col-sm-6 mb-6'>
									<div className='form-group'>
										<label className='form-label'>Company</label>
										<input
											className='form-control'
											type='text'
											placeholder='Company'
											name='company'
											value={company}
											onChange={(e) => onChange(e)}
										/>
									</div>
									<div className='form-group'>
										<label className='form-label'>Location</label>
										<input
											className='form-control'
											type='text'
											placeholder='Location'
											name='location'
											value={location}
											onChange={(e) => onChange(e)}
										/>
									</div>
									<div className='form-group'>
										<label className='form-label'>Professional Status</label>
										<select
											name='status'
											className='form-control'
											value={status}
											onChange={(e) => onChange(e)}
										>
											<option>* Select Professional Status</option>
											<option value='Developer'>Developer</option>
											<option value='Junior Developer'>Junior Developer</option>
											<option value='Senior Developer'>Senior Developer</option>
											<option value='Manager'>Manager</option>
											<option value='Student or Learning'>
												Student or Learning
											</option>
											<option value='Instructor'>Instructor or Teacher</option>
											<option value='Intern'>Intern</option>
											<option value='Other'>Other</option>
										</select>
									</div>
								</div>

								<div className='col-sm-6 mb-6'>
									<div className='form-group'>
										<label className='form-label'>Website</label>
										<input
											className='form-control'
											type='text'
											placeholder='Website'
											name='website'
											value={website}
											onChange={(e) => onChange(e)}
										/>
									</div>
									<div className='form-group'>
										<label className='form-label'>GitHub Username</label>
										<input
											className='form-control'
											type='text'
											placeholder='GitHub Username'
											name='githubusername'
											value={githubusername}
											onChange={(e) => onChange(e)}
										/>
									</div>
									<div className='form-group'>
										<label className='form-label'>Skills</label>
										<input
											className='form-control'
											type='text'
											placeholder='Skills'
											name='skills'
											value={skills}
											onChange={(e) => onChange(e)}
										/>
									</div>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12'>
									<div className='mb-3'>
										<h2 className='h5 mb-0'>About</h2>
										<p>Tell about yourself in two sentences.</p>
									</div>
									<div className='form-group'>
										<label className='form-label'>Bio</label>
										<textarea
											className='form-control'
											placeholder='Bio'
											name='bio'
											value={bio}
											onChange={(e) => onChange(e)}
										></textarea>
									</div>
								</div>
							</div>

							<hr className='my-7' />
							<button
								onClick={socialInputsToggler}
								type='button'
								className='btn btn-sm btn-primary transition-3d-hover mr-1'
							>
								Add Social Profiles (Optional)
							</button>

							{displaySocialInputs && socialInputsHtml}

							<hr className='my-7' />
							<button
								type='submit'
								className='btn btn-sm btn-primary transition-3d-hover mr-1'
							>
								Save Changes
							</button>
							<Link
								to='/dashboard'
								className='btn btn-sm btn-success transition-3d-hover mr-1'
							>
								Back
							</Link>
						</form>
					</div>
				</div>
			</DashboardNavbar>
		</Fragment>
	);
};

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteAvatar: PropTypes.func.isRequired,
	uploadAvatar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, {
	createProfile,
	getCurrentProfile,
	deleteAvatar,
	uploadAvatar,
})(CreateProfile);
