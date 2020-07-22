import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const Education = ({ education }) => {
	const educationList = education.map((item) => (
		<tr key={item._id}>
			<td>{item.school}</td>
			<td>{item.degree}</td>
			<td>{item.fieldofstudy}</td>
			<td>
                <Moment format='YYYY/MM/DD'>{item.from}</Moment>
                {!item.current ? (
                    <Fragment>
                        - 
                    <Moment format='YYYY/MM/DD'>{item.to}</Moment>
                    </Fragment>
                ): (
                    ' - Now'
                )}
            </td>
            <td>
                <button className="btn btn-sm btn-warning">
                    Delete
                </button>
            </td>
		</tr>
	));

	return (
		<Fragment>
			<div className='mb-3'>
				<h2 className='h5 mb-0'>Education</h2>
				<p>My education</p>
			</div>
			<table className='table'>
				<thead>
					<tr>
						<th>School</th>
						<th>Degree</th>
						<th>Field Of Study</th>
						<th>Years</th>
						<th />
					</tr>
				</thead>
				<tbody>{educationList}</tbody>
			</table>
		</Fragment>
	);
};

Education.propTypes = {
	education: PropTypes.array.isRequired,
};

export default Education;
