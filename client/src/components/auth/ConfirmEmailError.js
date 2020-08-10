import React, { Fragment, useState } from "react";
import illustration from '../../assets/svg/illustrations/relaxing-man.svg';
import axios from 'axios';
import {setAlert} from '../../actions/alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ConfirmEmailError = ({auth, setAlert}) => {

	const [sending, setSending] = useState(false);

    const onResendClicked = async (e) => {
        e.preventDefault();
		
		setSending(true);

		try {
			await axios.get('/api/auth/sendconfirm');
			setTimeout(() => {
				setSending(false);
				setAlert(`Email sent to ${auth.user.email}`, 'success');
			}, 1500);
		} catch (error) {
			const errors = error.response.data.errors;

			if (errors) {
				errors.forEach(err => {
					setAlert(err.msg, 'danger');
				});
			}
		}
    }

	return (
		<Fragment>
			<div className='d-flex'>
				<div className='container d-flex align-items-center vh-75'>
					<div className='row justify-content-md-center flex-md-grow-1 text-center'>
						<div className='col-md-9 col-lg-6'>
							<img
								className='img-fluid mb-2'
								src={illustration}
								alt='Email Confirmation Illustration'
							/>
							<h1 className='h2'>Confirm your email address</h1>
							<p>
								We've sent you a confirmation email. In order to use the
								application, you need to confirm your email address.
							</p>
                            <small className="text-muted">Email not received</small><br />
							<button onClick={(e) => onResendClicked(e)} type='button' className='btn btn-sm btn-success' disabled={sending}>
								Re-send activation email.
							</button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

ConfirmEmailError.propTypes = {
	auth: PropTypes.object.isRequired,
	setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth
})

export default connect(mapStateToProps, {setAlert})(ConfirmEmailError);
