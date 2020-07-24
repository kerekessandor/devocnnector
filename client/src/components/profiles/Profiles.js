import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "../profiles/ProfileItem";
import { getProfiles } from "../../actions/profile";

const Profiles = ({ getProfiles, profile }) => {
	useEffect(() => {
		getProfiles();
	}, [getProfiles]);

	const profileList = (
		<Fragment>
			{profile.profiles.length > 0 ? (
				profile.profiles.map((item) => <ProfileItem profile={item} />)
			) : (
				<h1>nincsenek profilok</h1>
			)}
		</Fragment>
	);

	return (
		<Fragment>
			{profile.loading ? (
				<Spinner />
			) : (
				<Fragment>
					<h1 className='text-primary'>Developers</h1>
					{profileList}
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
