import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

import logo from "../../img/logo.png";

const Navbar = ({ auth, logout}) => {

	const authLinks = (
		<React.Fragment>
			<a onClick={logout} href='#!' className='btn btn-primary-outline'>Logout</a>
		</React.Fragment>
	);

	const guestLinks = (
		<React.Fragment>
			<Link to='/login' className='btn btn-primary mr-2'>
				Log in
			</Link>

			<Link to='/register' className='btn btn-primary-outline'>
				Sign Up
			</Link>
		</React.Fragment>
	);

	return (
		<header className='masthead'>
			<div className='d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-transparent'>
				<h5 className='my-0 mr-md-auto font-weight-normal'>
					<Link to='/'>
						<img src={logo} alt='Kaltechs' />
					</Link>
				</h5>
				<nav className='my-2 my-md-0 mr-md-3'>
					<Link to='/' className='p-2 text-white'>
						HOME
					</Link>
					<a className='p-2 text-white' href='#about'>
						ABOUT
					</a>
					<a className='p-2 text-white' href='#ourwork'>
						OUR WORK
					</a>
					<a className='p-2 text-white' href='#services'>
						SERVICES
					</a>
					<a className='p-2 text-white' href='#feedback'>
						FEEDBACK
					</a>
					<a className='p-2 text-white' href='#inquery'>
						CONTACT
					</a>
				</nav>
				{auth.isAuthenticated ? authLinks : guestLinks}				
			</div>
		</header>
	);
};

// const mapStateToProps = (state) => {
// 	return {
// 		auth: state.auth,
// 	};
// };

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(Navbar);
