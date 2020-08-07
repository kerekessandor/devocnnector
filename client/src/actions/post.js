import axios from "axios";
import { GET_POSTS, POSTS_ERROR, UPDATE_LIKES, ERROR_LIKE } from "./types";

export const getPosts = () => async (dispatch) => {
	try {
        const postsList = await axios.get("/api/posts");
        
        console.log(postsList);

		dispatch({
			type: GET_POSTS,
			payload: postsList.data,
		});
	} catch (error) {
        console.log(error.response);
        dispatch({
            type: POSTS_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
              }
        })
    }
};

export const addLike = (post_id) => async dispatch => {
    try {
        const response = await axios.put(`/api/like/${post_id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ERROR_LIKE
        })
    }
}
