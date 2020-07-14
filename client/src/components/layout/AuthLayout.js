import React from "react";

import "../../assets/css/theme.css";
import { Link } from "react-router-dom";
import logo from '../../assets/img/logo.png';
import Alert from './Alert';

const AuthLayout = (props) => {
	return (
		<React.Fragment>
			<header
				id='header'
				className='u-header u-header--bg-transparent u-header--abs-top'
			>
				<div className='u-header__section'>
					<div id='logoAndNav' className='container-fluid'>
						<nav className='navbar navbar-expand u-header__navbar'>
							<Link to='/'
								className='d-none d-lg-flex navbar-brand u-header__navbar-brand u-header__navbar-brand-center u-header__navbar-brand-text-white'
								href='#!'
								aria-label='Front'
							>
								<img src={logo} className="img-fluid" alt="Kaltechs" />
							</Link>
						</nav>
					</div>
				</div>
			</header>
			<main id='content' role='main'>
				<div className='d-flex align-items-center position-relative height-lg-100vh'>
					{/* marketing section */}
					<div className='col-lg-5 col-xl-4 d-none d-lg-flex align-items-center gradient-half-primary-v1 height-lg-100vh px-0'>
						<div className='w-100 p-5'></div>
					</div>

					{/* child section */}
					<div className='container'>
						<div className='row no-gutters'>
							<div className='col-md-8 col-lg-7 col-xl-6 offset-md-2 offset-lg-2 offset-xl-3 space-3 space-lg-0'>
								<Alert />
								{props.children}
							</div>
						</div>
					</div>
				</div>
			</main>
		</React.Fragment>
	);
};

export default AuthLayout;
