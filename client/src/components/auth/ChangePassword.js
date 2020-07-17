import React, { useState } from "react";
import PropTypes from "prop-types";
import DashboardNavbar from "../layout/DashboardNavbar";
import { Link } from "react-router-dom";
import { changePassword } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";

const ChangePassword = ({ setAlert, changePassword, history }) => {
	const [formData, setFormData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const { currentPassword, newPassword, confirmPassword } = formData;

	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
        if (currentPassword === "" || confirmPassword === "" || newPassword === "") {
            setAlert("Please fill the fields correctly.", "danger");
            return;
        }
		if (newPassword !== confirmPassword) {
            setAlert("Passwords do not match", "danger");
            return;
        }
        
		changePassword(currentPassword, newPassword, confirmPassword, history);
	};

	return (
		<DashboardNavbar>
			<form onSubmit={(e) => onSubmit(e)}>
				<div className='form-group'>
					<label className='form-label'>Current Password</label>
					<input
						className='form-control'
						type='password'
						placeholder='Current Password'
						name='currentPassword'
                        value={currentPassword}
                        required
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-group mb-6'>
					<label className='form-label'>New Password</label>
					<input
						className='form-control'
						type='password'
						placeholder='New Password'
						name='newPassword'
                        value={newPassword}
                        required
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<label className='form-label'>Confirm Password</label>
					<input
						className='form-control'
						type='password'
						placeholder='Confirm Password'
						name='confirmPassword'
                        value={confirmPassword}
                        required
						onChange={(e) => onChange(e)}
					/>
				</div>

				<button
					type='submit'
					className='btn btn-sm btn-primary transition-3d-hover mr-1'
				>
					Save Password
				</button>
				<Link
					to='/dashboard'
					type='button'
					className='btn btn-sm btn-soft-secondary transition-3d-hover'
				>
					Cancel
				</Link>
			</form>
		</DashboardNavbar>
	);
};

ChangePassword.propTypes = {
	changePassword: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, changePassword })(ChangePassword);
