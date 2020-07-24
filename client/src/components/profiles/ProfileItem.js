import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({ profile }) => {
	return (
		<div>
			<img src={profile.user.avatar} alt='' className='round-img' />
			<div>
				<h2>{profile.user.name}</h2>
				<p>
					{profile.status}{" "}
					{profile.company && <span>at {profile.company}</span>}
				</p>
				<p className='mt-1'>
					{profile.location && <span>{profile.location}</span>}
				</p>
                <Link to={`/profile/${profile.user._id}`} className='btn btn-primary btn-sm'>
                    View Profile
                </Link>
			</div>
            <ul>
                {
                    profile.skills.slice(0, 4).map((item, index) => {
                        return (
                            <li key={index} className='text-primary'>
                                <i className="fas fa-check">
                                    {item}
                                </i>
                            </li>
                        )
                    })
                }
            </ul>
		</div>
	);
};

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileItem;
