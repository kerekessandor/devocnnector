import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import ProfileCard from "./ProfileCard";
import Navbar from "../layout/Navbar";
import ProfileAbout from "./ProfileAbout";
import ProfileSocial from "./ProfileSocial";
import { Link } from "react-router-dom";
import ProfileGithub from "./ProfileGithub";

const Profile = ({ match, getProfileById, profile, auth }) => {
	useEffect(() => {
		getProfileById(match.params.id);
	}, [getProfileById, match.params.id]);
	return (
		<Fragment>
			{profile.profile === null ? (
				<Spinner />
			) : (
				<Fragment>
					<Navbar />
					<div className='bg-primary'>
						<div className='container space-1'>
							<div className='d-sm-flex justify-content-sm-between align-items-sm-center'>
								<div className='mb-3 mb-sm-0'>
									<Link
										to='/'
										className='btn btn-sm btn-soft-white transition-3d-hover'
									>
										Back
									</Link>
								</div>

								{auth.isAuthenticated &&
									!auth.loading &&
									auth.user._id === profile.profile.user._id && (
										<a
											className='btn btn-sm btn-soft-white transition-3d-hover'
											href='/create-profile'
										>
											<span className='fas fa-user-cog small mr-2'></span>
											Edit Profile
										</a>
									)}
							</div>
						</div>
					</div>
					<div className='bg-light'>
						<div className='container space-2'>
							<div className='row'>
								<div className='col-lg-3 mb-7 mb-lg-0'>
									<ProfileCard profile={profile} />
									<ProfileSocial social={profile.profile.social} />
								</div>
								<div className='col-lg-9'>
									<ProfileAbout profile={profile} />
									{profile.profile.githubusername && (
										<ProfileGithub username={profile.profile.githubusername} />
									)}
								</div>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
