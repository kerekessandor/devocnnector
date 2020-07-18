import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DashboardNavbar from "../layout/DashboardNavbar";
import { getCurrentProfile } from "../../actions/profile";

const AddEducation = ({ profile, getCurrentProfile }) => {
	useEffect(() => {
		if (!profile.profile) getCurrentProfile();
	}, [getCurrentProfile]);

	const [formData, setFormData] = useState([
		{
			school: "",
			degree: "",
			fieldofstudy: "",
			from: "",
			to: "",
			current: false,
			description: "",
		},
	]);

	const onChange = (e, index) => {
		const newState = [...formData];

		newState[index][e.target.name] = e.target.value;

		setFormData(newState);
	};

	const addEducation = (e) => {
		setFormData([
			...formData,
			{
				school: "",
				degree: "",
				fieldofstudy: "",
				from: "",
				to: "",
				current: false,
				description: "",
			},
		]);
	};

	const removeEducation = (indexToRemove) => {
		const newState = formData.filter((value, index) => index !== indexToRemove);

		setFormData(newState);
	};

	return (
		<div>
			<DashboardNavbar>
				<div className='mb-3'>
					<h2 className='h5 mb-0'>Education</h2>
					<p>Tell us about your education.</p>
				</div>
				<form>
					{formData.map((item, index) => {
						const {
							school,
							degree,
							fieldofstudy,
							from,
							to,
							current,
							description,
						} = item;

						return (
							<div key={`education-${index}`}>
								<div className='row'>
									{index >= 1 && (
										<div className='col-sm-12 text-right'>
											<button
												type='button'
												className='btn btn-sm btn-warning'
												onClick={(e) => removeEducation(index)}
											>
												<i className='fas fa-trash-alt'></i>
											</button>
										</div>
									)}
									<div className='col-sm-12 col-md-6'>
										<div className='form-group'>
											<label className='form-label'>School</label>
											<input
												className='form-control'
												type='text'
												placeholder='School'
												name='school'
												value={school}
												onChange={(e) => onChange(e, index)}
											/>
										</div>
										<div className='form-group'>
											<label className='form-label'>Degree</label>
											<input
												className='form-control'
												type='text'
												placeholder='Degree'
												name='degree'
												value={degree}
												onChange={(e) => onChange(e, index)}
											/>
										</div>
										<div className='form-group'>
											<label className='form-label'>Field Of Study</label>
											<input
												className='form-control'
												type='text'
												placeholder='Field Of Study'
												name='fieldofstudy'
												value={fieldofstudy}
												onChange={(e) => onChange(e, index)}
											/>
										</div>
									</div>
									<div className='col-sm-12 col-md-6'>
										<div className='form-group'>
											<label className='form-label'>From</label>
											<input
												className='form-control'
												type='date'
												placeholder='From'
												name='from'
												value={from}
												onChange={(e) => onChange(e, index)}
											/>
										</div>
										<div className='form-group'>
											<label className='form-label'>To</label>
											<input
												className='form-control'
												type='date'
												placeholder='To'
												name='to'
												value={to}
												onChange={(e) => onChange(e, index)}
											/>
										</div>
										<div className='form-group'>
											<p>
												<input
													type='checkbox'
													name='current'
													checked={current}
													onChange={(e) => {
                                                        const copyState = [...formData];
                                                        copyState.forEach((item) => item.current = false);
														copyState[index].current = !current;
														setFormData(copyState);
													}}
												/>{" "}
												Current School
											</p>
										</div>
									</div>
									<div className='col-sm-12'>
										<div className='form-group'>
											<label className='form-label'>Description</label>
											<textarea
												className='form-control'
												placeholder='Description'
												name='description'
												value={description}
												onChange={(e) => onChange(e, index)}
											></textarea>
										</div>
									</div>
								</div>
								<hr className='my-7' />
							</div>
						);
					})}

					<button
						type='button'
						className='btn btn-primary'
						onClick={(e) => addEducation(e)}
					>
						Add new
					</button>
					<hr className='my-7' />
					<button type='submit' className='btn btn-success'>
						Save
					</button>
					<button type='button' className='btn btn-default'>
						Cancel
					</button>
				</form>
			</DashboardNavbar>
		</div>
	);
};

AddEducation.propTypes = {
	profile: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(AddEducation);
