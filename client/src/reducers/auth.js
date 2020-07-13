import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
	LOG_OUT,
} from "../actions/types";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	loading: true,
	user: null,
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			localStorage.setItem("token", payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false,
            };
        case LOGIN_ERROR:
        case AUTH_ERROR:
		case REGISTER_FAIL:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
			};
		case LOG_OUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null
			}
		default:
			return state;
	}
};