import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

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
			console.log(formData);
		}
	};

	return (
		<div className='d-flex'>
			<div className='mb-auto mt-auto'>
				<h1 className='kaltech-gradient'>Sign Up</h1>
				<p className='lead'>Create Your Account</p>
				<form onSubmit={(e) => onSubmit(e)}>
					<div className='form-group'>
						<input
							type='text'
							placeholder='Name'
							name='name'
							required
							className='form-control'
							value={formData.name}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className='form-group'>
						<input
							type='email'
							placeholder='Email Address'
							name='email'
							required
							className='form-control'
							value={formData.email}
							onChange={(e) => onChange(e)}
						/>
						<small className='form-text text-white'>
							This site uses Gravatar. If you want a profile image, use a
							Gravatar email
						</small>
					</div>
					<div className='form-group'>
						<input
							className='form-control'
							type='password'
							placeholder='Password'
							name='password'
							minLength='6'
							value={formData.password}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className='form-group'>
						<input
							className='form-control'
							type='password'
							placeholder='Confirm Password'
							name='password2'
							minLength='6'
							value={formData.password2}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<input type='submit' className='btn btn-primary' value='Register' />
				</form>
				<p className='my-1'>
					Already have an account?
					<Link to='/login'>Sign In</Link>
				</p>
			</div>
		</div>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Register);
