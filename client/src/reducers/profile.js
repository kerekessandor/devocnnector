import {GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE, UPDATE_PROFILE_ERROR} from '../actions/types'

const intitialState  = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default (state = intitialState, action) => {
    const { type, payload} = action;

    switch(type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case PROFILE_ERROR:
        case UPDATE_PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        default:
            return state;
    }
}