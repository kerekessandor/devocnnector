import React from "react";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import AuthLayout from "../layout/AuthLayout";

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: "kerekessandor87@gmail.com",
		password: "test1234",
	});

	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		login(formData.email, formData.password);
	};

	//redirect if logged in
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<AuthLayout>
			<form onSubmit={(e) => onSubmit(e)}>
				<div className='mb-7'>
					<h2 className='h3 text-primary font-weight-normal mb-0'>
						Welcome <span className='font-weight-semi-bold'>back</span>
					</h2>
					<p>Login to manage your account.</p>
				</div>
				<div className='form-group'>
					<input
						type='email'
						name='email'
						placeholder='Email'
						className='form-control'
						value={formData.email}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						name='password'
						placeholder='Password'
						className='form-control'
						value={formData.password}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className='row align-items-center mb-5'>
					<div className='col-6'>
						<span className='small text-muted'>Don't have an account?</span>
						<Link to='/register' className='small' href='signup.html'>
							Signup
						</Link>
					</div>

					<div className='col-6 text-right'>
					<input type='submit' className='btn btn-primary' value='Log In' />	
					</div>
				</div>
			</form>
		</AuthLayout>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
