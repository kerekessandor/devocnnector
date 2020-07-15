import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import {logout} from '../../actions/auth';

const DashboardNavbar = ({ auth, logout }) => {
	return auth.user === null ? (
		<Spinner />
	) : (
		<Fragment>
			<main id='content' role='main'>
				<div className='bg-primary'>
					<div className='container space-top-1 pb-3'>
						<div className='row'>
							<div className='col-lg-5 order-lg-2 text-lg-right mb-4 mb-lg-0'>
								<div className='d-flex d-lg-inline-block justify-content-between justify-content-lg-end align-items-center align-items-lg-start'>
									<ol className='breadcrumb breadcrumb-white breadcrumb-no-gutter mb-0'>
										<li className='breadcrumb-item active'>
											<a className='breadcrumb-link' href='#!' onClick={logout}>
												Logout
											</a>
										</li>
									</ol>

									<div className='d-lg-none'>
										<button
											type='button'
											className='navbar-toggler btn u-hamburger u-hamburger--white'
											aria-label='Toggle navigation'
											aria-expanded='false'
											aria-controls='breadcrumbNavBar'
											data-toggle='collapse'
											data-target='#breadcrumbNavBar'
										>
											<span
												id='breadcrumbHamburgerTrigger'
												className='u-hamburger__box'
											>
												<span className='u-hamburger__inner'></span>
											</span>
										</button>
									</div>
								</div>
							</div>

							<div className='col-lg-7 order-lg-1'>
								<div className='media d-block d-sm-flex align-items-sm-center'>
									<div className='u-lg-avatar position-relative mb-3 mb-sm-0 mr-3'>
										<img
											className='img-fluid rounded-circle'
											src={auth.user.avatar}
											alt='Image Description'
										/>
									</div>
									<div className='media-body'>
										<h1 className='h3 text-white font-weight-medium mb-1'>
											{auth.user.name}
										</h1>
										<span className='d-block text-white'>
											{auth.user.email}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</Fragment>
	);
};

DashboardNavbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {logout})(DashboardNavbar);
