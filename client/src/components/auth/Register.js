import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import AuthLayout from "../layout/AuthLayout";

const Register = (props) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});

	const onChange = (e) =>
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});

	const onSubmit = async (e) => {
		e.preventDefault();
		if (formData.password !== formData.password2) {
			console.log("Password do not match");
			props.setAlert("Password do not match", "danger", 5000);
		} else {
			props.register({
				name: formData.name,
				email: formData.email,
				password: formData.password,
			});
		}
	};

	//redirect if logged in
	if (props.isAuthenticated) {
		return <Redirect to='/dashbaord' />;
	}

	return (
		<AuthLayout>
			<form onSubmit={(e) => onSubmit(e)}>
				<div className='mb-7'>
					<h1 className='h3 text-primary font-weight-normal mb-0'>
						Welcome to <span className='font-weight-semi-bold'>Kaltechs</span>
					</h1>
					<p>Fill out the form to get started.</p>
				</div>
				<div className='form-group'>
					<label className='form-label'>Full Name</label>
					<input
						type='text'
						placeholder='Name'
						name='name'
						className='form-control'
						value={formData.name}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<label className='form-label'>Email Address</label>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						className='form-control'
						value={formData.email}
						onChange={(e) => onChange(e)}
					/>
					<small className='form-text text-white'>
						This site uses Gravatar. If you want a profile image, use a Gravatar
						email
					</small>
				</div>
				<div className='form-group'>
					<label className='form-label'>Password</label>
					<input
						className='form-control'
						type='password'
						placeholder='Password'
						name='password'
						value={formData.password}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<label className='form-label'>Confirm password</label>
					<input
						className='form-control'
						type='password'
						placeholder='Confirm Password'
						name='password2'
						value={formData.password2}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='row align-items-center mb-5'>
					<div className='col-5 col-sm-6'>
						<span className='small text-muted'>Already have an account?</span>
						<Link to='/login' className='small' href='login.html'>
							Login
						</Link>
					</div>

					<div className='col-7 col-sm-6 text-right'>
						<button
							type='submit'
							className='btn btn-primary transition-3d-hover'
						>
							Get Started
						</button>
					</div>
				</div>
			</form>
		</AuthLayout>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
