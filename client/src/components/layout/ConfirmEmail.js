import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import verifiedUser from "../../assets/svg/illustrations/verified-user.svg";
import errorImage from "../../assets/svg/illustrations/error-number-400.svg";
import Spinner from "./Spinner";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ConfirmEmail = ({ match, setAlert }) => {
	const [confirmed, setConfirmed] = useState(false);
	const [confirmError, setConfirmError] = useState(false);

	useEffect(() => {
		const confirmEmail = async () => {
			try {
				await axios.get(`/api/auth/confirm/${match.params.id}`);
                setConfirmed(true);
                setConfirmError(false);
			} catch (error) {
				const errors = error.response.data.errors;

				if (errors) {
					errors.forEach((err) => {
						setAlert(err.msg, "danger");
					});
                }
                
                setConfirmError(true);
			}
        };
        
        confirmEmail();
	}, [match, setAlert]);

	return (
		<Fragment>
			{!confirmed ? (
				<Spinner />
			) : (
				<div className='d-flex'>
					<div className='container d-flex align-items-center vh-75'>
						<div className='row justify-content-md-center flex-md-grow-1 text-center'>
							{!confirmError ? (
								<div className='col-md-9 col-lg-6'>
									<img
										className='img-fluid mb-2'
										src={verifiedUser}
										alt='Email Confirmed Illustration'
									/>
									<h1 className='h2'>Email confirmation</h1>
									<p>
										Your email was confirmed. <br /> Please Log In to your
										account using the button below.
									</p>
									<Link to='/login' className='btn btn-sm btn-success'>
										Login
									</Link>
								</div>
							) : (
								<div className='col-md-9 col-lg-6'>
									<img
										className='img-fluid mb-2'
										src={errorImage}
										alt='Email Confirmed Illustration'
									/>
									<h1 className='h2'>An error occured</h1>
									<p>
										An error occured, while trying to validate your email address.
									</p>
									<Link to='/login' className='btn btn-sm btn-success'>
										Login
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</Fragment>
	);
};

ConfirmEmail.propTypes = {
    setAlert: PropTypes.func.isRequired,
}

export default connect(null, {setAlert})(ConfirmEmail);
