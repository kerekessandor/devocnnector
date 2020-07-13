import React from "react";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import { connect } from "react-redux";

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
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
		console.log(formData);
	};

	//redirect if logged in
	if (isAuthenticated){
		return <Redirect to="/dashbaord" />
	}

	return (
		<div className='d-flex'>
			<div className='mb-auto mt-auto'>
				<h1 className='kaltech-gradient'>Sign In</h1>
				<form onSubmit={(e) => onSubmit(e)}>
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
					<input type='submit' className='btn btn-primary' value='Log In' />
				</form>
				<p className='my-1'>
					Don't have an account?
					<Link to='/register'>Sign Up</Link>
				</p>
			</div>
		</div>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({ isAuthenticated: state.auth.isAuthenticated });

export default connect(mapStateToProps, { login })(Login);
