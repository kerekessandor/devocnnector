import axios from "axios";
import {
	GET_PROFILE,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	UPDATE_PROFILE_ERROR,
	CLEAR_PROFILE,
	DELETE_ACCOUNT,
	GET_PROFILES,
	GET_GITHUB_REPO,
} from "./types";
import { setAlert } from "./alert";
import { loadUser } from "./auth";

export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/profile/me");

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});

		dispatch({
			type: CLEAR_PROFILE,
		});
	}
};

//Get all profiles
export const getProfiles = () => async (dispatch) => {
	try {
		const response = await axios.get("/api/profile");

		dispatch({
			type: GET_PROFILES,
			payload: response.data,
		});
	} catch (error) {
		console.error(error.message);
		if (error.response.data.error) {
			error.response.data.error.forEach((err) => {
				dispatch(setAlert(err.msg, "danger"));
			});
		}

		dispatch({
			type: PROFILE_ERROR,
		});
	}
};

//Get profile by Id
export const getProfileById = (userId) => async (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });

	try {
		const response = await axios.get(`/api/profile/user/${userId}`);

		dispatch({
			type: GET_PROFILE,
			payload: response.data,
		});
	} catch (error) {
		console.error(error.message);
		if (error.response.data.error) {
			error.response.data.error.forEach((err) => {
				dispatch(setAlert(err.msg, "danger"));
			});
		}

		dispatch({
			type: PROFILE_ERROR,
		});
	}
};

export const deleteAvatar = () => async (dispatch) => {
	try {
		await axios.delete(`/api/profile/avatar`);

		dispatch(loadUser());
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
		});

		dispatch(setAlert(error, 'error'));
	}
};

export const uploadAvatar = (file) => async (dispatch) => {
	try {
		const formData = new FormData();
		formData.append("avatar", file);
		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		};

		await axios.post("/api/profile/avatar", formData, config);

		dispatch(loadUser());
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
		});

		dispatch(setAlert(error.response.data.error, 'danger'));
	}
};

//get github repo
export const getGithubRepository = (username) => async (dispatch) => {
	try {
		const response = await axios.get(`/api/profile/github/${username}`);

		dispatch({
			type: GET_GITHUB_REPO,
			payload: response.data,
		});
	} catch (error) {
		console.error(error.message);
		if (error.response.data.error) {
			error.response.data.error.forEach((err) => {
				dispatch(setAlert(err.msg, "danger"));
			});
		}

		dispatch({
			type: PROFILE_ERROR,
		});
	}
};

//add education
export const saveEducation = (formData, history, edit = false) => async (
	dispatch
) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		for (const item in formData) {
			await axios.put("/api/profile/education", JSON.stringify(item), config);
		}

		dispatch({
			type: UPDATE_PROFILE,
		});

		if (!edit) {
			history.push("/dashboard");
		}
	} catch (error) {
		console.error(error.message);
		if (error.response.data.error) {
			error.response.data.error.forEach((err) => {
				dispatch(setAlert(err.msg, "danger"));
			});
		}

		dispatch({
			type: UPDATE_PROFILE_ERROR,
		});
	}
};

//create or update a profile
export const createProfile = (formData, history, edit = false) => async (
	dispatch
) => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await axios.post("/api/profile", formData, config);

		dispatch({
			type: UPDATE_PROFILE,
			payload: response.data,
		});

		dispatch(setAlert(edit ? "Profile Updated" : "Profile created", "success"));

		if (!edit) {
			history.push("/dashboard");
		}
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => {
				dispatch(setAlert(error.msg, "danger"));
			});
		}
		dispatch({
			type: UPDATE_PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const addExperience = (formData, history) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const response = await axios.put(
			"/api/profile/experience",
			formData,
			config
		);

		dispatch({
			type: UPDATE_PROFILE,
			payload: response.data,
		});

		dispatch(setAlert("Experience added.", "success"));

		history.push("/dashboard");
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((error) => {
				dispatch(setAlert(error.msg, "Danger"));
			});
		}

		dispatch({
			type: UPDATE_PROFILE_ERROR,
		});
	}
};

export const deleteExperience = (id) => async (dispatch) => {
	try {
		const response = await axios.delete(`/api/profile/experience/${id}`);

		dispatch(setAlert("Experience removed", "success"));

		dispatch({
			type: UPDATE_PROFILE,
			payload: response.data,
		});
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((error) => {
				dispatch(setAlert(error.msg, "Danger"));
			});
		}

		dispatch({
			type: UPDATE_PROFILE_ERROR,
		});
	}
};

export const deleteAccount = () => async (dispatch) => {
	if (window.confirm("Are you sure? This cannot be undone!")) {
		try {
			await axios.delete("api/profile");

			dispatch({
				type: CLEAR_PROFILE,
			});

			dispatch({
				type: DELETE_ACCOUNT,
			});

			dispatch(setAlert("Your account has been deleted", "success"));
		} catch (error) {
			const errors = error.response.data.errors;

			if (errors) {
				errors.forEach((error) => {
					dispatch(setAlert(error.msg, "Danger"));
				});
			}

			dispatch({
				type: PROFILE_ERROR,
			});
		}
	}
};
