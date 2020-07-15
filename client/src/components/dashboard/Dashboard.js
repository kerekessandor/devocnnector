import React, { Fragment } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profile";
import { Redirect } from "react-router-dom";
import Spinner from "../layout/Spinner";

import DashboardNavbar from '../layout/DashboardNavbar';

const Dashboard = ({getCurrentProfile, auth, profile: {profile, loading}}) => {

	useEffect(() => {
		getCurrentProfile();
	}, []);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<DashboardNavbar/>
			<h1>Welcome {auth.user && auth.user.name}</h1>
            {profile !== null ? <Fragment>has</Fragment> : <Fragment>no profile</Fragment>}
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
