import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profile";

const Experience = ({ experience, deleteExperience }) => {

	const experiences = experience.map((exp) => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			<td>{exp.title}</td>
			<td>
				<Moment format='YYYY/MM/DD'>{exp.from}</Moment>
				{exp.to === null ? (
					" - Now"
				) : (
					<Fragment>
						- <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
					</Fragment>
				)}
			</td>
			<td>
				<button
					onClick={(e) => deleteExperience(exp._id)}
					className='btn btn-sm btn-warning'
				>
					Delete
				</button>
			</td>
		</tr>
	));

	return (
		<Fragment>
			<div className='mb-3'>
				<h2 className='h5 mb-0'>Experiences</h2>
				<p>Experience Credentials</p>
			</div>
			<table className='table'>
				<thead>
					<tr>
						<th>Company</th>
						<th>Title</th>
						<th>Years</th>
						<th />
					</tr>
				</thead>
				<tbody>{experiences}</tbody>
			</table>
		</Fragment>
	);
};

Experience.propTypes = {
	experience: PropTypes.array.isRequired,
	deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
