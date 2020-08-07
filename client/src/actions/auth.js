import axios from "axios";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	LOG_OUT,
	CLEAR_PROFILE,
	CHANGE_PASSWORD_SUCCESS,
	CHANGE_PASSWORD_ERROR,
	ACCOUNT_CONFIRM_ERROR,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

//Load User
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get("/api/auth");

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (error) {
		dispatch({ type: AUTH_ERROR });
	}
};

//LOGIN USER
export const login = (email, password) => async (dispatch) => {
	const body = JSON.stringify({
		email,
		password,
	});

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const loginResponse = await axios.post("/api/auth", body, config);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: loginResponse.data,
		});

		dispatch(loadUser());
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((error) => {
				dispatch(setAlert(error.msg, "danger"));
			});
		}

		dispatch({
			type: LOGIN_ERROR,
		});

		if (errors.isConfirmed !== undefined && !errors.isConfirmed) {
			dispatch({
				type: ACCOUNT_CONFIRM_ERROR,
			});
		}
	}
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
	const body = JSON.stringify({
		name,
		email,
		password,
	});

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const response = await axios.post("/api/users/register", body, config);
		console.log(response.data);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: response.data,
		});
		dispatch(loadUser());
	} catch (error) {
		console.error(error);
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((error) => {
				dispatch(setAlert(error.msg, "danger"));
			});
		}
		dispatch({
			type: REGISTER_FAIL,
		});
	}
};

//change password
export const changePassword = (
	password,
	newPassword,
	confirmPassword,
	history
) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = JSON.stringify({
		password,
		newPassword,
		confirmPassword,
	});

	try {
		const response = await axios.post("/api/auth/resetpassword", body, config);

		dispatch({
			type: CHANGE_PASSWORD_SUCCESS,
			payload: response.data,
		});

		dispatch(setAlert("Password updated!", "success"));

		history.push("/dashboard");
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((er) => {
				dispatch(setAlert(er.msg, "danger"));
			});
		} else {
			dispatch(
				setAlert(`${err.response.status}: ${err.response.statusText}`, "danger")
			);
		}

		dispatch({
			type: CHANGE_PASSWORD_ERROR,
		});
	}
};

//Logout User
export const logout = () => (dispatch) => {
	dispatch({
		type: LOG_OUT,
	});
	dispatch({
		type: CLEAR_PROFILE,
	});
};
