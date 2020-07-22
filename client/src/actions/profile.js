import axios from "axios";
import {
	GET_PROFILE,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	UPDATE_PROFILE_ERROR,
} from "./types";
import { setAlert } from "./alert";

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
	}
};

//add education
export const saveEducation = (formData, history, edit = false) => async dispatch => {

	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	try {
		for (const item in formData) {
			await axios.put('/api/profile/education', JSON.stringify(item), config);
		}

		dispatch({
			type: UPDATE_PROFILE
		});

		if (!edit){
			history.push('/dashboard');
		}

	} catch (error) {
		console.error(error.message);
		if (error.response.data.error) {
			error.response.data.error.forEach(err => {
				dispatch(setAlert(err.msg, "danger"));
			});
		}

		dispatch({
			type: UPDATE_PROFILE_ERROR
		})
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

export const addExperience = (formData, history) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	try {
		const response = await axios.put('/api/profile/experience', formData, config);	

		dispatch({
			type: UPDATE_PROFILE,
			payload: response.data
		});

		dispatch(setAlert('Experience added.', 'success'));

		history.push('/dashboard');
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach(error => {
				dispatch(setAlert(error.msg, 'Danger'));
			});
		}

		dispatch({
			type: UPDATE_PROFILE_ERROR
		})
	}
}
