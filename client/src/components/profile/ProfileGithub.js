import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepository } from "../../actions/profile";
import Spinner from "../layout/Spinner";

const ProfileGithub = ({ username, getGithubRepository, repos }) => {
	useEffect(() => {
		getGithubRepository(username);
	}, [getGithubRepository, username]);

	return (
		<Fragment>
			<div className='row mb-7'>
				<div className='col-md-12 mb-7 mb-md-0'>
					<div className='mb-3'>
						<h3 className='h6 mb-0'>GitHub Repository</h3>
					</div>
				</div>
			</div>
			<div className='row'>
				{repos === null ? (
					<Spinner />
				) : (
					repos.map((repo) => (
						<div className='col-sm-12 col-md-3' key={repo._id}>
							<h4>
								<a href={repo.html_url} target='_blank' rel="noopener noreferrer">
									{repo.name}
								</a>
							</h4>
							<p>{repo.description}</p>
							<div>
								<ul>
									<li className='badge badge-primary'>
										Stars: {repo.stargazers_count}
									</li>
                                    <li className='badge badge-dark'>
										Watchers: {repo.watchers_count}
									</li>
                                    <li className='badge badge-light'>
										Forks: {repo.forks_count}
									</li>
								</ul>
							</div>
						</div>
					))
				)}
			</div>
		</Fragment>
	);
};

ProfileGithub.propTypes = {
	getGithubRepository: PropTypes.func.isRequired,
	repos: PropTypes.array.isRequired,
	username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepository })(ProfileGithub);
