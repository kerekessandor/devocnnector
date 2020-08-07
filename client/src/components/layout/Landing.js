import React, { Fragment } from "react";
import Navbar from "./Navbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { Redirect } from "react-router-dom";
import Profiles from "../profiles/Profiles";
import Posts from "../posts/Posts";

const Landing = ({ isAuthenticated }) => {
	// if (isAuthenticated) {
	// 	return <Redirect to='/dashboard' />;
	// }

	return (
		<Fragment>
			<div className='cover-container d-flex w-100 p-3 mx-auto flex-column'>
				<Navbar />
				<main role='main' className='inner cover mb-auto mt-auto motto'>
					<div className='container'>
						<h1 className='text-white headerTitle'>
							Life would be much easier, <br /> if we would have the source code
						</h1>
						<p className='kaltech-gradient'>
							Kaltechs is a great solution for your idea, without the source
							code.
						</p>
					</div>
				</main>
			</div>
			<Profiles />
			<Posts />
		</Fragment>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
	};
};

export default connect(mapStateToProps)(Landing);
