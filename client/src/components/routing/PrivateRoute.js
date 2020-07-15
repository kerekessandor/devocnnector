import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Spinner from "../layout/Spinner";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				auth.loading ? (
					<Spinner />
				) : auth.isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to='/login' />
				)
			}
		/>
	);
};

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
