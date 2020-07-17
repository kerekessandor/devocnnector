import React, { Fragment } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profile";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";

import DashboardNavbar from "../layout/DashboardNavbar";

const Dashboard = ({ getCurrentProfile, auth, profile }) => {
	useEffect(() => {
		getCurrentProfile();
	}, []);

	return profile.loading && profile.profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<DashboardNavbar>
			<div className='container space-2'>
				{profile.profile != null ? (
					<Fragment>You have a profile</Fragment>
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
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		profile: state.profile,
		auth: state.auth,
	};
};

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
