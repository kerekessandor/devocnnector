import { SET_ALERT, REMOVE_ALERT } from "./types";
import uuid from 'uuid/v4';

export const setAlert = (msg, alertType, time = 5000) => dispatch => {
	const id = uuid();
	dispatch({
		type: SET_ALERT,
		payload: {
			msg,
			alertType,
			id,
			time
		},
	});

	setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), time);
};
