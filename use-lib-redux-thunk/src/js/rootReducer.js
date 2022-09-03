import { FETCH_USERS_STARTED, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from './types.js';

const initState = {
    users: [],
    loading: false,
    error: null,
};

export const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_USERS_STARTED:
            return {
                users: [],
                loading: true,
                error: null,
            };
        case FETCH_USERS_SUCCESS:
            return {
                users: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_USERS_FAILURE:
            return {
                users: [],
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
