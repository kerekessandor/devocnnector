import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { logout } from "../../actions/auth";
import Alert from "../layout/Alert";

const DashboardNavbar = ({ auth, logout, children, profile }) => {
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
									{auth.user.imageName !== null ? (
											<img
												className='img-fluid rounded-circle'
												src={`/api/profile/${auth.user._id}/avatar/${auth.user.imageName}`}
												alt={auth.user.name}
											/>
										) : (
											<img
												className='img-fluid rounded-circle'
												src={auth.user.avatar}
												alt={auth.user.name}
											/>
										)}
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

					{/* Links */}

					<div className='container space-bottom-1 space-bottom-lg-0'>
						<div className='d-lg-flex justify-content-lg-between align-items-lg-center'>
							<div className='u-header u-header-left-aligned-nav u-header--bg-transparent-lg u-header--white-nav-links z-index-4'>
								<div className='u-header__section bg-transparent'>
									<nav className='navbar navbar-expand-lg navbar-light'>
										<button
											className='navbar-toggler'
											type='button'
											data-toggle='collapse'
											data-target='#navbarNavDropdown'
											aria-controls='navbarNavDropdown'
											aria-expanded='false'
											aria-label='Toggle navigation'
										>
											<span className='navbar-toggler-icon'></span>
										</button>
										<div
											className='collapse navbar-collapse'
											id='navbarNavDropdown'
										>
											<ul className='navbar-nav'>
												<li className='nav-item dropdown'>
													<a
														className='nav-link dropdown-toggle'
														href='#!'
														id='navbarDropdownMenuLink'
														role='button'
														data-toggle='dropdown'
														aria-haspopup='true'
														aria-expanded='false'
													>
														Account settings
													</a>
													<div
														className='dropdown-menu'
														aria-labelledby='navbarDropdownMenuLink'
													>
														{profile.profile && (
															<Fragment>
																<Link
																	to='/create-profile'
																	className='dropdown-item'
																>
																	Edit Profile
																</Link>
																<Link
																	to='/add-experience'
																	className='dropdown-item'
																>
																	Add Experience
																</Link>
																<Link
																	to='/add-education'
																	className='dropdown-item'
																>
																	Add Education
																</Link>
															</Fragment>
														)}
														<Link
															to='/change-password'
															className='dropdown-item'
														>
															Change password
														</Link>
													</div>
												</li>
											</ul>
										</div>
									</nav>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
			<div className='bg-light'>
				<div className='container space-2'>
					<Alert />
					{children}
				</div>
			</div>
		</Fragment>
	);
};

DashboardNavbar.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { logout })(DashboardNavbar);
