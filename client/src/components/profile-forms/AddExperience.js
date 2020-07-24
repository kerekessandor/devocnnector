import React, { Fragment, useState } from "react";
import DashboardNavbar from "../layout/DashboardNavbar";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const initialState = {
	title: "",
	company: "",
	location: "",
	from: "",
	to: "",
	current: false,
	description: "",
};

const AddExperience = ({ addExperience, history }) => {
	const [formData, setFormData] = useState(initialState);
    const [toDateDisabled, toggleDisabled] = useState(false);


	const { title, company, location, from, to, current, description } = formData;

	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
    };
    
    const submitForm = (e) => {
        e.preventDefault();
        addExperience(formData, history);
    }

	return (
		<Fragment>
			<DashboardNavbar>
				<div className='mb-3'>
					<h2 className='h5 mb-0'>Experience</h2>
					<p>Tell us about your experience.</p>
				</div>
				<form onSubmit={(e) => submitForm(e)}>
					<div className='row'>
						<div className='col-sm-12 col-md-6'>
							<div className='form-group'>
								<label className='form-label'>Title</label>
								<input
									className='form-control'
									type='text'
									placeholder='Title'
									name='title'
									value={title}
									required
									onChange={(e) => onChange(e)}
								/>
							</div>
							<div className='form-group'>
								<label className='form-label'>Location</label>
								<input
									className='form-control'
									type='text'
									placeholder='Location'
									name='location'
									value={location}
									onChange={(e) => onChange(e)}
								/>
							</div>
							<div className='form-group'>
								<label className='form-label'>From Date</label>
								<input
									className='form-control'
									type='date'
									placeholder='From Date'
									name='from'
									value={from}
									required
									onChange={(e) => onChange(e)}
								/>
							</div>
							<div className='form-group'>
								<label className='form-label'>To Date</label>
								<input
									className='form-control'
									type='date'
									placeholder='To'
									name='to'
									value={to}
                                    onChange={(e) => onChange(e)}
                                    disabled={toDateDisabled ? 'disabled' : ''}
								/>
							</div>
						</div>
						<div className='col-sm-12 col-md-6'>
							<div className='form-group'>
								<label className='form-label'>Company</label>
								<input
									className='form-control'
									type='text'
									placeholder='Company'
									name='company'
									value={company}
									required
									onChange={(e) => onChange(e)}
								/>
							</div>
							<div className='form-group'>
								<p>
									<input
										type='checkbox'
										name='current'
										checked={current}
										onChange={(e) => {
											setFormData({
												...formData,
												current: !current,
                                            });
                                            toggleDisabled(
                                                !toDateDisabled 
                                            )
										}}
									/>{" "}
									Current
								</p>
							</div>
							<div className='form-group'>
								<label className='form-label'>Description</label>
								<textarea
									className='form-control'
									placeholder='Description'
									name='description'
									value={description}
									onChange={(e) => onChange(e)}
								></textarea>
							</div>
						</div>
					</div>
                    <button type='submit' className='btn btn-success'>
						Save
					</button>
                    <Link to='/dashboard' className='btn btn-default'>
                        Cancel
                    </Link>
				</form>
			</DashboardNavbar>
		</Fragment>
	);
};

AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
