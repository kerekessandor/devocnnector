import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "../profiles/ProfileItem";
import { getProfiles } from "../../actions/profile";
import { Link } from "react-router-dom";

const Profiles = ({ getProfiles, profile }) => {
	useEffect(() => {
		getProfiles();
	}, [getProfiles]);

	const profileList = (
		<Fragment>
			{profile.profiles.length > 0 ? (
				profile.profiles.map((item) => <ProfileItem profile={item} />)
			) : (
				<div className='text-center'>
					<p>
						No developers yet registered. Be the first and register for free
						<Link to='/register' className='btn btn-primary btn-sm'>
							register
						</Link>
					</p>
				</div>
			)}
		</Fragment>
	);

	return (
		<Fragment>
			{profile.loading ? (
				<Spinner />
			) : (
				<Fragment>
					<div className='container mt-5'>
						<div className='w-md-80 text-center mx-md-auto mb-9'>
							<h2>Featured Developers</h2>
							<p>Discover our developers and their work.</p>
						</div>
					</div>
					<div className='container'>
						<div className='row mb-5'>{profileList}</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
