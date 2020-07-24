import React, { Fragment } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";

import DashboardNavbar from "../layout/DashboardNavbar";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({ getCurrentProfile, auth, profile, deleteAccount }) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return profile.loading && profile.profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<DashboardNavbar>
				<div className='container space-2'>
					{profile.profile != null ? (
						<Fragment>
							{profile.profile.experience.length ? (
								<Experience experience={profile.profile.experience} />
							) : (
								<div className='text-center'>
									<Link to='/add-experience' className='btn btn-success btn-sm'>
										Add new experience
									</Link>
								</div>
							)}
							<Education education={profile.profile.education} />

							<button className="btn btn-sm btn-danger" onClick={() => deleteAccount()}>
								Delete My Account
							</button>
						</Fragment>
					) : (
						<div className='text-center'>
							<p>You have not yet setup a profile, please add some info</p>
							<Link to='/create-profile' className='btn btn-primary'>
								Create profile
							</Link>
						</div>
					)}
				</div>
			</DashboardNavbar>
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		profile: state.profile,
		auth: state.auth,
	};
};

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
