import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
    });

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        console.log(formData);
    }

	return (
		<div className='d-flex'>
			<div className='mb-auto mt-auto'>
				<h1 className='kaltech-gradient'>Sign In</h1>
				<form onSubmit={ e => onSubmit(e)}>
					<div className='form-group'>
						<input
							type='email'
							name='email'
							placeholder='Email'
                            className='form-control'
                            value={formData.email}
                            onChange={ (e) => onChange(e)}
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
                            onChange={e => onChange(e)}
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

export default Login;
